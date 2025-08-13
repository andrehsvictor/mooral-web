'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Fab,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Visibility,
  Edit,
  Share,
  Public,
  Lock,
  TrendingUp,
  Image as ImageIcon,
  VideoLibrary,
  TextFields,
  MoreVert,
} from '@mui/icons-material';
import { useState } from 'react';

interface MuralPost {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  timestamp: string;
}

interface Mural {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  views: number;
  posts: MuralPost[];
  createdAt: string;
  lastUpdated: string;
}

export default function DashboardPage() {
  const [murals] = useState<Mural[]>([
    {
      id: '1',
      title: 'My Travel Adventures',
      description: 'Sharing my journey around the world',
      isPublic: true,
      views: 1247,
      posts: [
        {
          id: '1',
          type: 'image',
          content: 'Beautiful sunset in Bali',
          timestamp: '2 hours ago',
        },
        {
          id: '2',
          type: 'text',
          content: 'Just arrived in Tokyo! The energy here is incredible...',
          timestamp: '1 day ago',
        },
        {
          id: '3',
          type: 'video',
          content: 'Street food tour in Bangkok',
          timestamp: '3 days ago',
        },
      ],
      createdAt: '2024-01-15',
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      title: 'Daily Thoughts',
      description: 'Personal reflections and ideas',
      isPublic: false,
      views: 0,
      posts: [
        {
          id: '4',
          type: 'text',
          content: 'Thoughts on minimalism and its impact on creativity...',
          timestamp: '5 hours ago',
        },
        {
          id: '5',
          type: 'text',
          content: 'Book recommendations for this month',
          timestamp: '2 days ago',
        },
      ],
      createdAt: '2024-02-01',
      lastUpdated: '5 hours ago',
    },
    {
      id: '3',
      title: 'Tech Discoveries',
      description: 'Cool technology finds and tutorials',
      isPublic: true,
      views: 892,
      posts: [
        {
          id: '6',
          type: 'text',
          content: 'New React patterns I discovered this week',
          timestamp: '1 day ago',
        },
        {
          id: '7',
          type: 'image',
          content: 'My coding setup 2024',
          timestamp: '4 days ago',
        },
      ],
      createdAt: '2024-01-20',
      lastUpdated: '1 day ago',
    },
  ]);

  const totalViews = murals.reduce((sum, mural) => sum + mural.views, 0);
  const publicMurals = murals.filter((mural) => mural.isPublic).length;
  const totalPosts = murals.reduce((sum, mural) => sum + mural.posts.length, 0);

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon fontSize="small" />;
      case 'video':
        return <VideoLibrary fontSize="small" />;
      default:
        return <TextFields fontSize="small" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return '#4CAF50';
      case 'video':
        return '#FF9800';
      default:
        return '#2196F3';
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ color: '#3e5c76', fontWeight: 600, mb: 1 }}
          >
            My Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your murals and track their performance
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Paper
              elevation={2}
              sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}
            >
              <Typography
                variant="h3"
                sx={{ color: '#3e5c76', fontWeight: 700 }}
              >
                {totalViews.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Views
              </Typography>
              <TrendingUp sx={{ color: '#4CAF50', mt: 1 }} />
            </Paper>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Paper
              elevation={2}
              sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}
            >
              <Typography
                variant="h3"
                sx={{ color: '#3e5c76', fontWeight: 700 }}
              >
                {murals.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Murals
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                {publicMurals} public
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Paper
              elevation={2}
              sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}
            >
              <Typography
                variant="h3"
                sx={{ color: '#3e5c76', fontWeight: 700 }}
              >
                {totalPosts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Posts
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Murals Grid */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: '#3e5c76', fontWeight: 600, mb: 3 }}
          >
            Your Murals
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 3,
            }}
          >
            {murals.map((mural) => (
              <Card
                elevation={3}
                sx={{ height: 'fit-content', borderRadius: 2 }}
                key={mural.id}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: '#3e5c76', fontWeight: 600 }}
                    >
                      {mural.title}
                    </Typography>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {mural.description}
                  </Typography>

                  <Box
                    sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}
                  >
                    <Chip
                      icon={mural.isPublic ? <Public /> : <Lock />}
                      label={mural.isPublic ? 'Public' : 'Private'}
                      size="small"
                      color={mural.isPublic ? 'success' : 'default'}
                    />
                    <Chip
                      icon={<Visibility />}
                      label={`${mural.views} views`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  {/* Post Types Breakdown */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, display: 'block' }}
                    >
                      Posts ({mural.posts.length})
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {Array.from(
                        new Set(mural.posts.map((post) => post.type))
                      ).map((type) => {
                        const count = mural.posts.filter(
                          (post) => post.type === type
                        ).length;
                        return (
                          <Chip
                            key={type}
                            icon={getPostTypeIcon(type)}
                            label={`${count} ${type}`}
                            size="small"
                            sx={{
                              backgroundColor: getPostTypeColor(type) + '20',
                              color: getPostTypeColor(type),
                              border: `1px solid ${getPostTypeColor(type)}40`,
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>

                  {/* Recent Activity */}
                  <Typography variant="caption" color="text.secondary">
                    Last updated: {mural.lastUpdated}
                  </Typography>

                  {/* Views Progress Bar */}
                  {mural.isPublic && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Engagement
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((mural.views / 2000) * 100, 100)}
                        sx={{
                          mt: 0.5,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#3e5c76',
                          },
                        }}
                      />
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    sx={{ color: '#3e5c76' }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Share />}
                    sx={{ color: '#3e5c76' }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    sx={{ color: '#3e5c76' }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add mural"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#3e5c76',
            '&:hover': {
              backgroundColor: '#2c4461',
            },
          }}
        >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
}
