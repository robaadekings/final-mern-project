# Banner Components for Multi-Vendor E-commerce Platform

This document explains how to use and customize the banner components that have been added to enhance the user experience of your multi-vendor e-commerce platform.

## 🎯 Overview

The banner system includes four main components designed to create engaging, interactive product placement and promotional displays:

1. **HeroBanner** - Full-width carousel banners for main promotions
2. **PromotionalBanner** - Alert-style banners for special offers and announcements
3. **CategoryBanner** - Visual category navigation with attractive imagery
4. **FeaturedProductsBanner** - Product showcase with carousel functionality

## 🚀 Components

### 1. HeroBanner

A full-width carousel banner component that automatically cycles through multiple promotional banners.

**Features:**
- Auto-advancing carousel (5-second intervals)
- Navigation arrows and dot indicators
- Smooth transitions and hover effects
- Responsive design
- Call-to-action buttons

**Usage:**
```jsx
import HeroBanner from '../components/HeroBanner';
import { heroBanners } from '../data/bannerData';

<HeroBanner banners={heroBanners} />
```

**Props:**
- `banners` (array): Array of banner objects with title, description, image, buttonText, and buttonLink

### 2. PromotionalBanner

Alert-style banners for displaying special offers, discounts, and announcements.

**Features:**
- Multiple types: sale, new, hot, default
- Dismissible option
- Animated borders and patterns
- Responsive design
- Call-to-action buttons

**Usage:**
```jsx
import PromotionalBanner from '../components/PromotionalBanner';

<PromotionalBanner
    title="Free Shipping"
    description="Free shipping on orders over $50"
    buttonText="Shop Now"
    buttonLink="/products"
    type="sale"
    dismissible={true}
/>
```

**Props:**
- `title` (string): Banner title
- `description` (string): Banner description
- `buttonText` (string): Button text (optional)
- `buttonLink` (string): Button link (optional)
- `type` (string): Banner type - 'sale', 'new', 'hot', or 'default'
- `dismissible` (boolean): Whether banner can be dismissed
- `onDismiss` (function): Callback when banner is dismissed

### 3. CategoryBanner

Visual category navigation with attractive imagery and hover effects.

**Features:**
- Grid layout for multiple categories
- Hover animations and effects
- Category icons and descriptions
- Responsive grid system
- Call-to-action buttons

**Usage:**
```jsx
import CategoryBanner from '../components/CategoryBanner';
import { categoryBanners } from '../data/bannerData';

<CategoryBanner categories={categoryBanners} />
```

**Props:**
- `categories` (array): Array of category objects with name, description, image, icon, and link

### 4. FeaturedProductsBanner

Product showcase with carousel functionality and product cards.

**Features:**
- Auto-advancing carousel
- Product cards with ratings, prices, and discounts
- Navigation controls
- Responsive grid layout
- Hover effects

**Usage:**
```jsx
import FeaturedProductsBanner from '../components/FeaturedProductsBanner';
import { featuredProducts } from '../data/bannerData';

<FeaturedProductsBanner 
    products={featuredProducts}
    title="Featured Products"
    subtitle="Handpicked for you"
/>
```

**Props:**
- `products` (array): Array of product objects
- `title` (string): Section title
- `subtitle` (string): Section subtitle

## 📁 File Structure

```
src/
├── components/
│   ├── HeroBanner.jsx
│   ├── PromotionalBanner.jsx
│   ├── CategoryBanner.jsx
│   └── FeaturedProductsBanner.jsx
├── data/
│   └── bannerData.js
├── pages/
│   ├── Home.jsx (updated with banners)
│   └── Products.jsx (updated with banners)
└── index.css (updated with banner animations)
```

## 🎨 Customization

### Banner Data Configuration

Edit `src/data/bannerData.js` to customize banner content:

```javascript
export const heroBanners = [
    {
        id: 1,
        title: "Your Custom Title",
        description: "Your custom description",
        image: "your-image-url.jpg",
        buttonText: "Custom Button",
        buttonLink: "/custom-link"
    }
];
```

### Styling

The components use Tailwind CSS classes and can be customized by:

1. **Modifying the component files** - Change classes, colors, and layouts
2. **Updating CSS variables** - Modify colors and spacing in `index.css`
3. **Adding custom animations** - Extend the animation keyframes in `index.css`

### Colors and Themes

The banner system uses a consistent color palette:
- Primary: Purple to Pink gradients
- Secondary: Blue to Indigo gradients
- Accent: Orange to Red gradients
- Neutral: Gray scale

## 🔧 Implementation Examples

### Adding Banners to a New Page

```jsx
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import PromotionalBanner from '../components/PromotionalBanner';
import { pageBanners } from '../data/bannerData';

function NewPage() {
    return (
        <div>
            {/* Hero Banner */}
            <section className="py-8">
                <div className="container mx-auto px-6">
                    <HeroBanner banners={pageBanners.home.hero} />
                </div>
            </section>

            {/* Promotional Banners */}
            <section className="py-6">
                <div className="container mx-auto px-6 space-y-4">
                    {pageBanners.home.promotional.map((banner) => (
                        <PromotionalBanner
                            key={banner.id}
                            {...banner}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
```

### Creating Custom Banner Data

```javascript
// In bannerData.js
export const customBanners = [
    {
        id: 1,
        title: "Seasonal Sale",
        description: "Up to 70% off on winter collection",
        image: "/images/winter-sale.jpg",
        buttonText: "Shop Now",
        buttonLink: "/sale",
        type: "sale",
        dismissible: false
    }
];
```

## 🎭 Animation Classes

The following CSS animation classes are available:

- `.animate-fade-in` - Fade in from bottom
- `.animate-slide-in-left` - Slide in from left
- `.animate-slide-in-right` - Slide in from right
- `.animate-scale-in` - Scale in from center
- `.animate-bounce-in` - Bounce in effect
- `.animate-float` - Floating animation
- `.animate-pulse-glow` - Pulsing glow effect

## 📱 Responsive Design

All banner components are fully responsive and include:

- Mobile-first design approach
- Adaptive grid layouts
- Touch-friendly navigation
- Optimized image loading
- Responsive typography

## 🚀 Performance Tips

1. **Image Optimization**: Use optimized images with appropriate sizes
2. **Lazy Loading**: Consider implementing lazy loading for banner images
3. **Animation Performance**: Use CSS transforms instead of layout properties
4. **Bundle Size**: Components are tree-shakeable and only import what's needed

## 🔄 Updating Banner Content

To update banner content without code changes:

1. **Modify `bannerData.js`** - Update text, links, and images
2. **Replace images** - Update image URLs in the data file
3. **Add new banners** - Extend the arrays with new banner objects
4. **Modify timing** - Adjust auto-advance intervals in component files

## 🎨 Design Guidelines

- **Consistency**: Use consistent spacing, typography, and color schemes
- **Accessibility**: Ensure proper contrast ratios and keyboard navigation
- **Performance**: Optimize images and minimize JavaScript execution
- **User Experience**: Make banners engaging but not intrusive

## 🐛 Troubleshooting

### Common Issues

1. **Banners not showing**: Check that banner data is properly imported
2. **Images not loading**: Verify image URLs are correct and accessible
3. **Layout issues**: Ensure proper CSS classes and responsive breakpoints
4. **Animation glitches**: Check for conflicting CSS animations

### Debug Mode

Add console logs to debug banner data:

```javascript
console.log('Banner data:', pageBanners);
console.log('Hero banners:', pageBanners.home.hero);
```

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [CSS Animation Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 🤝 Contributing

To add new banner types or modify existing ones:

1. Create the new component in `src/components/`
2. Add corresponding data structure in `bannerData.js`
3. Update the documentation
4. Test across different screen sizes
5. Ensure accessibility compliance

---

**Note**: These banner components are designed to work with your existing multi-vendor e-commerce platform. They integrate seamlessly with your current design system and can be easily customized to match your brand requirements.
