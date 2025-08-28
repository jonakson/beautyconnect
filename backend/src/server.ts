/**
 * BeautyConnect Backend Server
 * Express.js server with TypeScript
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { HTTP_STATUS } from '@beautyconnect/shared/constants';
import { ApiResponse } from '@beautyconnect/shared/types';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.API_PORT || 4000;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
  },
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'BeautyConnect API is healthy',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
    },
  };
  res.status(HTTP_STATUS.OK).json(response);
});

// Version endpoint
app.get('/api/version', (req, res) => {
  const response: ApiResponse = {
    success: true,
    data: {
      version: process.env.npm_package_version || '1.0.0',
      name: 'BeautyConnect API',
      environment: process.env.NODE_ENV || 'development',
    },
  };
  res.status(HTTP_STATUS.OK).json(response);
});

// TODO: Add API routes here
// app.use('/api/auth', authRoutes);
// app.use('/api/businesses', businessRoutes);
// app.use('/api/appointments', appointmentRoutes);

// 404 handler
app.use('*', (req, res) => {
  const response: ApiResponse = {
    success: false,
    error: 'Endpoint not found',
  };
  res.status(HTTP_STATUS.NOT_FOUND).json(response);
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);

  const response: ApiResponse = {
    success: false,
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
  };

  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json(response);
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Join business room for real-time updates
  socket.on('join:business', (businessId: string) => {
    socket.join(`business:${businessId}`);
    console.log(`Client ${socket.id} joined business room: ${businessId}`);
  });

  // Leave business room
  socket.on('leave:business', (businessId: string) => {
    socket.leave(`business:${businessId}`);
    console.log(`Client ${socket.id} left business room: ${businessId}`);
  });
});

// Make io available globally for real-time updates
declare global {
  var io: SocketServer;
}
global.io = io;

// Start server
server.listen(PORT, () => {
  console.log(`🚀 BeautyConnect API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});