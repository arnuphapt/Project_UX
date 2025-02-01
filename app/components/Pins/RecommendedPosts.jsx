import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody } from "@nextui-org/react";
import _ from 'lodash';

const RecommendedPosts = ({ currentPost, maxPosts = 4 }) => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      if (!currentPost?.techList && !currentPost?.usertaged) return;

      const allTags = [
        ...(currentPost.techList || []),
        ...(currentPost.usertaged || [])
      ];

      if (allTags.length === 0) return;

      try {
        const postsRef = collection(db, 'pinterest-post');
        
        // Query posts with matching section
        const sectionQuery = query(postsRef, 
          where('section', '==', currentPost.section)
        );
        const sectionSnapshot = await getDocs(sectionQuery);
        
        // Filter posts with matching tags from the same section
        const matchingPosts = [];
        sectionSnapshot.docs.forEach(doc => {
          const postData = { id: doc.id, ...doc.data() };
          
          // Skip current post
          if (postData.id === currentPost.id) return;
          
          // Check if post has any matching tags
          const postTags = [
            ...(postData.techList || []),
            ...(postData.usertaged || [])
          ];
          
          const hasMatchingTag = allTags.some(tag => 
            postTags.includes(tag)
          );
          
          if (hasMatchingTag) {
            matchingPosts.push(postData);
          }
        });

        // Randomly shuffle the matching posts and take the first maxPosts
        const shuffledPosts = _.shuffle(matchingPosts);
        setRecommendedPosts(shuffledPosts.slice(0, maxPosts));

      } catch (error) {
        console.error('Error fetching recommended posts:', error);
      }
    };

    fetchRecommendedPosts();
  }, [currentPost, db, maxPosts]);

  if (recommendedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Posts You May Like in Section {currentPost.section}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedPosts.map((post) => (
          <Link href={`/post/${post.userName}/${post.id}`} key={post.id}>
            <Card className="w-full h-full">
              <CardBody className="p-0">
                <div className="relative w-full pb-[100%] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {post.userName}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.techList?.slice(0, 2).map((tech, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;