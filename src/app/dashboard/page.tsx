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
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Badge,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Search,
  FilterList,
  Sort,
  Analytics,
  Notifications,
  Settings,
  Download,
  Delete,
  ContentCopy,
  Schedule,
  People,
  Comment,
  Favorite,
  BarChart,
  Timeline,
  Today,
  ThumbUp,
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
  likes: number;
  comments: number;
  category: string;
  collaborators?: string[];
  scheduledPost?: boolean;
}

export default function DashboardPage() {
  // Enhanced state management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const [murals] = useState<Mural[]>([
    {
      id: '1',
      title: 'My Travel Adventures',
      description: 'Sharing my journey around the world',
      isPublic: true,
      views: 1247,
      likes: 89,
      comments: 24,
      category: 'Travel',
      collaborators: ['Alice', 'Bob'],
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
      likes: 0,
      comments: 0,
      category: 'Personal',
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
      likes: 156,
      comments: 43,
      category: 'Technology',
      scheduledPost: true,
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

  // Enhanced analytics calculations
  const totalViews = murals.reduce((sum, mural) => sum + mural.views, 0);
  const totalLikes = murals.reduce((sum, mural) => sum + mural.likes, 0);
  const totalComments = murals.reduce((sum, mural) => sum + mural.comments, 0);
  const publicMurals = murals.filter((mural) => mural.isPublic).length;
  const totalPosts = murals.reduce((sum, mural) => sum + mural.posts.length, 0);
  const scheduledMurals = murals.filter((mural) => mural.scheduledPost).length;
  const collaborativeMurals = murals.filter(
    (mural) => mural.collaborators && mural.collaborators.length > 0
  ).length;

  // Categories breakdown
  const categories = [...new Set(murals.map((mural) => mural.category))];
  const averageEngagement =
    totalViews > 0
      ? (((totalLikes + totalComments) / totalViews) * 100).toFixed(1)
      : '0';

  // Filter and sort functions
  const filteredMurals = murals
    .filter((mural) => {
      const matchesSearch =
        mural.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mural.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === 'all' || mural.category === filterCategory;
      const matchesTab =
        selectedTab === 0 ||
        (selectedTab === 1 && mural.isPublic) ||
        (selectedTab === 2 && !mural.isPublic) ||
        (selectedTab === 3 && mural.scheduledPost);
      return matchesSearch && matchesCategory && matchesTab;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          );
      }
    });

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
    <Box sx={{ backgroundColor: '#faf8f5', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        {/* Enhanced Header with Analytics Toggle */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: '#3e5c76', fontWeight: 700, mb: 1 }}
              >
                My Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your murals and track their performance
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => setShowAnalytics(!showAnalytics)}
                sx={{
                  backgroundColor: showAnalytics ? '#3e5c76' : 'transparent',
                  color: showAnalytics ? 'white' : '#3e5c76',
                  '&:hover': { backgroundColor: '#3e5c76', color: 'white' },
                }}
              >
                <Analytics />
              </IconButton>
              <IconButton sx={{ color: '#3e5c76' }}>
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton sx={{ color: '#3e5c76' }}>
                <Settings />
              </IconButton>
            </Box>
          </Box>

          {/* Search and Filter Bar */}
          <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <TextField
                placeholder="Search murals..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 250 }}
              />

              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  // Filter menu would open here
                }}
                sx={{ color: '#3e5c76', borderColor: '#3e5c76' }}
              >
                Filter ({filterCategory === 'all' ? 'All' : filterCategory})
              </Button>

              <Button
                variant="outlined"
                startIcon={<Sort />}
                sx={{ color: '#3e5c76', borderColor: '#3e5c76' }}
              >
                Sort by {sortBy}
              </Button>

              <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                <Chip
                  label={`${filteredMurals.length} murals`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Paper>

          {/* Tab Navigation */}
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="All Murals" />
            <Tab label={`Public (${publicMurals})`} />
            <Tab label={`Private (${murals.length - publicMurals})`} />
            <Tab label={`Scheduled (${scheduledMurals})`} />
          </Tabs>
        </Box>

        {/* Enhanced Analytics Panel */}
        {showAnalytics && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              📊 Analytics Overview
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 3,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {averageEngagement}%
                </Typography>
                <Typography variant="body2">Engagement Rate</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {totalLikes}
                </Typography>
                <Typography variant="body2">Total Likes</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {totalComments}
                </Typography>
                <Typography variant="body2">Total Comments</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {collaborativeMurals}
                </Typography>
                <Typography variant="body2">Collaborations</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {categories.length}
                </Typography>
                <Typography variant="body2">Categories</Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Enhanced Stats Cards */}
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

        {/* Enhanced Murals Grid */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: '#3e5c76', fontWeight: 600, mb: 3 }}
          >
            Your Murals
          </Typography>

          {filteredMurals.length === 0 ? (
            <Paper
              elevation={2}
              sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No murals found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search or filter criteria
              </Typography>
            </Paper>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 3,
              }}
            >
              {filteredMurals.map((mural) => (
                <Card
                  elevation={3}
                  sx={{
                    height: 'fit-content',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                  }}
                  key={mural.id}
                >
                  <CardContent>
                    {/* Enhanced Header with Category Badge */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            mb: 1,
                            flexWrap: 'wrap',
                          }}
                        >
                          <Chip
                            label={mural.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          {mural.scheduledPost && (
                            <Chip
                              label="Scheduled"
                              size="small"
                              color="warning"
                              icon={<Schedule />}
                            />
                          )}
                          {mural.collaborators &&
                            mural.collaborators.length > 0 && (
                              <Chip
                                label={`${mural.collaborators.length} collaborators`}
                                size="small"
                                color="secondary"
                                icon={<People />}
                              />
                            )}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ color: '#3e5c76', fontWeight: 600, mb: 0.5 }}
                        >
                          {mural.title}
                        </Typography>
                      </Box>
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

                    {/* Enhanced Engagement Metrics */}
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        backgroundColor: '#f8f9fa',
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <ThumbUp sx={{ fontSize: 16, color: '#3e5c76' }} />
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: 600 }}
                            >
                              {mural.likes}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <Comment sx={{ fontSize: 16, color: '#3e5c76' }} />
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: 600 }}
                            >
                              {mural.comments}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <Visibility
                              sx={{ fontSize: 16, color: '#3e5c76' }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: 600 }}
                            >
                              {mural.views}
                            </Typography>
                          </Box>
                        </Box>
                        {mural.views > 0 && (
                          <Typography variant="caption" color="text.secondary">
                            {(
                              ((mural.likes + mural.comments) / mural.views) *
                              100
                            ).toFixed(1)}
                            % engagement
                          </Typography>
                        )}
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

                  <CardActions
                    sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', gap: 1 }}>
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
                    </Box>
                    <Box>
                      <IconButton size="small" sx={{ color: '#3e5c76' }}>
                        <Analytics />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#3e5c76' }}>
                        <ContentCopy />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        {/* Enhanced Floating Action Buttons */}
        <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
          {/* Secondary Actions */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              mb: 1,
              alignItems: 'flex-end',
            }}
          >
            <Fab
              size="small"
              sx={{
                backgroundColor: '#f0f0f0',
                color: '#3e5c76',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <Analytics />
            </Fab>
            <Fab
              size="small"
              sx={{
                backgroundColor: '#f0f0f0',
                color: '#3e5c76',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <Download />
            </Fab>
            <Fab
              size="small"
              sx={{
                backgroundColor: '#f0f0f0',
                color: '#3e5c76',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <Settings />
            </Fab>
          </Box>

          {/* Primary Action */}
          <Fab
            color="primary"
            aria-label="add mural"
            sx={{
              backgroundColor: '#3e5c76',
              '&:hover': {
                backgroundColor: '#2c4461',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Add />
          </Fab>
        </Box>
      </Container>
    </Box>
  );
}
