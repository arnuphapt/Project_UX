import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../Shared/firebaseConfig";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Avatar } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdminCarousel = () => {
  const [adminPosts, setAdminPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const q = query(
          collection(db, "admin-posts"), 
          orderBy("createdAt", "desc"), 
          limit(3)  // เพิ่มจำนวนโพสต์ที่ดึงมากขึ้น
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAdminPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching admin posts: ", error);
        setIsLoading(false);
      }
    };

    fetchAdminPosts();
  }, []);

  // Custom Previous Arrow
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button 
        className="absolute top-1/2 -left-10 z-10 transform -translate-y-1/2"
        onClick={onClick}
      >
        <ChevronLeft size={32} className="text-gray-600 hover:text-blue-500" />
      </button>
    );
  };

  // Custom Next Arrow
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button 
        className="absolute top-1/2 -right-10 z-10 transform -translate-y-1/2"
        onClick={onClick}
      >
        <ChevronRight size={32} className="text-gray-600 hover:text-blue-500" />
      </button>
    );
  };

  // Carousel Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Format date in Thai locale
  const formatDate = (timestamp) => {
    if (!timestamp) return "ไม่ทราบวันที่";
    const date = timestamp.toDate();
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };


  return (
    <div className="container mx-auto px-4 relative max-w-6xl">
      <Slider {...settings}>
        {adminPosts.map((post) => (
          <div key={post.id} className="p-2">
            <Card className="max-w-[400px] h-full">
              <CardHeader className="flex gap-3">
                <Avatar 
                  isBordered 
                  radius="full" 
                  size="md" 
                  src={post.authorImage} 
                  alt={`${post.authorName}'s avatar`}
                />
                <div className="flex flex-col">
                  <p className="text-md font-bold">{post.authorName}</p>
                  <p className="text-small text-default-500">{post.authorEmail}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="flex-grow">
                <h3 className="font-bold mb-2 text-lg">{post.title}</h3>
                <p className="mb-2 flex-grow line-clamp-3">{post.content}</p>
                <p className="text-sm text-default-500 mt-2">
                  โพสต์เมื่อ: {formatDate(post.createdAt)}
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/nextui-org/nextui"
                >
                  ดูเพิ่มเติม
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdminCarousel;