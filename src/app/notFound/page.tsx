import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import './notFound.css';

/**
 * Trang 404 - Hiển thị khi đường dẫn không tồn tại
 */
const NotFoundPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="not-found-page container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="mb-8">
        <h1 className="not-found-code text-9xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Trang không tìm thấy</h2>
        <p className="text-gray-600 max-w-md mb-4 mx-auto">
          Đường dẫn <span className="font-mono bg-gray-100 px-2 py-1 rounded">{location.pathname}</span> không tồn tại hoặc đã được di chuyển đến vị trí khác.
        </p>
        <p className="text-gray-500 max-w-md mb-8 mx-auto">
          Bạn có thể trở về trang chủ hoặc xem các sản phẩm của chúng tôi.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="px-6 py-2" asChild>
          <Link to="/">Trở về trang chủ</Link>
        </Button>
        <Button variant="outline" className="px-6 py-2" asChild>
          <Link to="/men/sneakers">Xem sản phẩm</Link>
        </Button>
      </div>

      {/* Gợi ý sản phẩm */}
      <div className="mt-20 w-full">
        <h3 className="text-xl font-medium mb-6">Có thể bạn quan tâm</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Popular Product Items */}
          <div className="suggested-products p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="bg-gray-100 rounded-md aspect-square mb-3 flex items-center justify-center">
              <span className="text-gray-400">Sản phẩm 1</span>
            </div>
            <h4 className="font-medium">Nike Air Force 1</h4>
            <p className="text-gray-600 text-sm">$120</p>
          </div>
          
          <div className="suggested-products p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="bg-gray-100 rounded-md aspect-square mb-3 flex items-center justify-center">
              <span className="text-gray-400">Sản phẩm 2</span>
            </div>
            <h4 className="font-medium">Adidas Ultra Boost</h4>
            <p className="text-gray-600 text-sm">$180</p>
          </div>
          
          <div className="hidden md:block suggested-products p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="bg-gray-100 rounded-md aspect-square mb-3 flex items-center justify-center">
              <span className="text-gray-400">Sản phẩm 3</span>
            </div>
            <h4 className="font-medium">Puma Suede Classic</h4>
            <p className="text-gray-600 text-sm">$90</p>
          </div>
          
          <div className="hidden md:block suggested-products p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="bg-gray-100 rounded-md aspect-square mb-3 flex items-center justify-center">
              <span className="text-gray-400">Sản phẩm 4</span>
            </div>
            <h4 className="font-medium">Converse Chuck Taylor</h4>
            <p className="text-gray-600 text-sm">$65</p>
          </div>
        </div>
      </div>
      
      {/* Additional Links */}
      <div className="mt-16 text-gray-500">
        <p>Vẫn không tìm thấy thứ bạn đang tìm kiếm?</p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/cart" className="return-link text-gray-600 hover:text-gray-900">Giỏ hàng</Link>
          <Link to="/men/sneakers" className="return-link text-gray-600 hover:text-gray-900">Danh mục</Link>
          <span className="hidden sm:inline">|</span>
          <Link to="/" className="return-link text-gray-600 hover:text-gray-900">Trợ giúp</Link>
          <Link to="/" className="return-link text-gray-600 hover:text-gray-900">Liên hệ</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
