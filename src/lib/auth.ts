/**
 * Simple JWT-based authentication system
 * Works with Airtable member database
 */
import jwt from 'jsonwebtoken';
import { airtableService, Member } from './airtable';

interface AuthToken {
  email: string;
  membershipLevel: string;
  exp: number;
}

class AuthService {
  private jwtSecret: string;

  constructor() {
    // In production, this would be an environment variable
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-here';
  }

  /**
   * Authenticate member with email/password
   * (Password verification would be added based on your needs)
   */
  async authenticateMember(email: string, password: string): Promise<string | null> {
    try {
      // Get member from Airtable
      const member = await airtableService.getMemberByEmail(email);
      
      if (!member || !member.isActive) {
        return null;
      }

      // Here you would verify password
      // For now, we'll assume password verification passes
      const isPasswordValid = await this.verifyPassword(email, password);
      
      if (!isPasswordValid) {
        return null;
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          email: member.email,
          membershipLevel: member.membershipLevel,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        },
        this.jwtSecret
      );

      return token;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  /**
   * Verify JWT token and return member info
   */
  verifyToken(token: string): AuthToken | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as AuthToken;
      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  /**
   * Check if member has access to specific program
   */
  async checkProgramAccess(token: string, programId: string): Promise<boolean> {
    const decoded = this.verifyToken(token);
    
    if (!decoded) {
      return false;
    }

    return await airtableService.checkProgramAccess(decoded.email, programId);
  }

  /**
   * Verify password (placeholder - implement based on your needs)
   * Could integrate with Google Workspace, or use bcrypt for stored passwords
   */
  private async verifyPassword(email: string, password: string): Promise<boolean> {
    // Implementation depends on your password strategy:
    
    // Option 1: Google Workspace SSO
    // Option 2: Passwords stored in Airtable (hashed)
    // Option 3: Magic link authentication
    
    // For demo purposes, return true
    // In production, implement proper password verification
    return true;
  }

  /**
   * Generate magic link for passwordless login
   */
  generateMagicLink(email: string): string {
    const token = jwt.sign(
      { email, purpose: 'magic-link', exp: Math.floor(Date.now() / 1000) + (15 * 60) }, // 15 minutes
      this.jwtSecret
    );
    
    return `${process.env.SITE_URL}/auth/magic-login?token=${token}`;
  }
}

export const authService = new AuthService();
export type { AuthToken };