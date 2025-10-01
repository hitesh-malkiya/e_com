/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    domains: [
      'res.cloudinary.com',     // for cloudinary images
      'lh3.googleusercontent.com' // for Google profile images
    ],
  },
};

export default nextConfig;
