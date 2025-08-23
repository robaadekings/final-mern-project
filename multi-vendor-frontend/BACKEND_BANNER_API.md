# Backend Banner Management API

This document outlines the backend API endpoints needed to support the admin banner management functionality.

## 🔐 Authentication

All banner management endpoints require admin authentication:
- **Headers**: `Authorization: Bearer <admin_token>`
- **Role**: User must have `role: 'admin'`

## 📍 Base URL

```
/api/admin/banners
```

## 🚀 API Endpoints

### 1. Get All Banners

**GET** `/api/admin/banners`

Returns all banners organized by type.

**Response:**
```json
{
  "hero": [
    {
      "id": "1",
      "title": "Summer Collection 2024",
      "description": "Discover the latest trends",
      "image": "https://example.com/image.jpg",
      "buttonText": "Shop Now",
      "buttonLink": "/products"
    }
  ],
  "promotional": [...],
  "categories": [...],
  "featured": [...]
}
```

### 2. Create Banner

**POST** `/api/admin/banners/:type`

Creates a new banner of the specified type.

**Parameters:**
- `type`: One of `hero`, `promotional`, `category`, `featured`

**Request Body:**
```json
{
  "title": "Banner Title",
  "description": "Banner description",
  "image": "https://example.com/image.jpg",
  "buttonText": "Button Text",
  "buttonLink": "/products",
  "type": "sale",
  "dismissible": true,
  "showOnlyForNonLoggedIn": false
}
```

**Response:**
```json
{
  "id": "new_banner_id",
  "title": "Banner Title",
  "description": "Banner description",
  "image": "https://example.com/image.jpg",
  "buttonText": "Button Text",
  "buttonLink": "/products",
  "type": "sale",
  "dismissible": true,
  "showOnlyForNonLoggedIn": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 3. Update Banner

**PUT** `/api/admin/banners/:type/:id`

Updates an existing banner.

**Parameters:**
- `type`: Banner type (`hero`, `promotional`, `category`, `featured`)
- `id`: Banner ID

**Request Body:** Same as create banner

**Response:** Updated banner object

### 4. Delete Banner

**DELETE** `/api/admin/banners/:type/:id`

Deletes a banner.

**Parameters:**
- `type`: Banner type
- `id`: Banner ID

**Response:**
```json
{
  "message": "Banner deleted successfully"
}
```

### 5. Get Banner by Type

**GET** `/api/admin/banners/:type`

Returns all banners of a specific type.

**Parameters:**
- `type`: Banner type

**Response:** Array of banners of the specified type

## 🗄️ Database Schema

### Banner Collection Structure

```javascript
// Hero Banners
{
  _id: ObjectId,
  type: "hero",
  title: String,
  description: String,
  image: String,
  buttonText: String,
  buttonLink: String,
  createdAt: Date,
  updatedAt: Date
}

// Promotional Banners
{
  _id: ObjectId,
  type: "promotional",
  title: String,
  description: String,
  image: String,
  buttonText: String,
  buttonLink: String,
  bannerType: String, // "sale", "new", "hot", "default"
  dismissible: Boolean,
  showOnlyForNonLoggedIn: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Category Banners
{
  _id: ObjectId,
  type: "category",
  name: String,
  description: String,
  image: String,
  icon: String,
  link: String,
  createdAt: Date,
  updatedAt: Date
}

// Featured Products
{
  _id: ObjectId,
  type: "featured",
  name: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  category: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Considerations

1. **Admin Only Access**: All endpoints require admin role verification
2. **Input Validation**: Validate all banner data before saving
3. **Image URL Validation**: Ensure image URLs are safe and accessible
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Audit Logging**: Log all banner creation, updates, and deletions

## 🚨 Error Handling

**Standard Error Responses:**

```json
// 400 Bad Request
{
  "error": "Validation failed",
  "details": ["Title is required", "Image URL is invalid"]
}

// 401 Unauthorized
{
  "error": "Authentication required"
}

// 403 Forbidden
{
  "error": "Admin access required"
}

// 404 Not Found
{
  "error": "Banner not found"
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}
```

## 📝 Implementation Notes

1. **File Upload**: Consider implementing image upload functionality instead of just URL input
2. **Banner Scheduling**: Add support for scheduling banners to show/hide at specific times
3. **A/B Testing**: Implement banner performance tracking and A/B testing
4. **Caching**: Cache banner data for better performance
5. **Backup**: Implement banner data backup and restore functionality

## 🔄 Frontend Integration

The frontend will:
1. Fetch banner data on page load
2. Allow admins to create, edit, and delete banners
3. Provide real-time preview of banner changes
4. Handle form validation and error display
5. Update banner display immediately after changes

## 📱 Mobile Considerations

1. **Responsive Forms**: Ensure banner management forms work on mobile devices
2. **Touch-Friendly**: Make buttons and inputs touch-friendly
3. **Image Preview**: Show image previews on mobile devices
4. **Offline Support**: Consider offline banner editing capabilities

---

**Note**: This API structure provides a solid foundation for banner management. You can extend it with additional features like banner analytics, scheduling, and advanced targeting based on your specific requirements.
