import React from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogData';
import '../assets/css/blog.css';

const BlogPage = () => {
    return (
        <main>
            {/* HERO SECTION */}
            <section className="blog-hero">
                <div className="container">
                    <span className="blog-hero__label">Our Blog</span>
                    <h1 className="blog-hero__title">
                        Vontrex <span>Blog</span>
                    </h1>
                    <p className="blog-hero__subtitle">
                        Training tips, gear guides, and everything you need to dominate the ring
                    </p>
                </div>
            </section>

            {/* BLOG GRID */}
            <section className="section">
                <div className="container">
                    <div className="blog-grid">
                        {blogPosts.map(post => (
                            <Link to={`/blog/${post.slug}`} className="blog-card" key={post.id}>
                                <div className="blog-card__image-wrapper">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="blog-card__image"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="blog-card__content">
                                    <div className="blog-card__meta">
                                        <span className="blog-card__category">{post.category}</span>
                                        <span>{post.date}</span>
                                        <span>·</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="blog-card__title">{post.title}</h2>
                                    <p className="blog-card__excerpt">{post.excerpt}</p>
                                    <span className="blog-card__readmore">
                                        Read Article →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BlogPage;
