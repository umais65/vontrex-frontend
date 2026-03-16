import React from 'react';
import DOMPurify from 'dompurify';
import { useParams, Link, Navigate } from 'react-router-dom';
import blogPosts from '../data/blogData';
import '../assets/css/blog.css';

/* Simple markdown-like renderer for our blog content */
const renderContent = (content) => {
    const lines = content.trim().split('\n');
    const elements = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Skip empty lines
        if (line.trim() === '') {
            i++;
            continue;
        }

        // H2
        if (line.trim().startsWith('## ')) {
            elements.push(<h2 key={key++}>{line.trim().replace('## ', '')}</h2>);
            i++;
            continue;
        }

        // H3
        if (line.trim().startsWith('### ')) {
            elements.push(<h3 key={key++}>{line.trim().replace('### ', '')}</h3>);
            i++;
            continue;
        }

        // Blockquote
        if (line.trim().startsWith('> ')) {
            let quoteLines = [];
            while (i < lines.length && lines[i].trim().startsWith('> ')) {
                quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
                i++;
            }
            elements.push(
                <blockquote key={key++}>
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(quoteLines.join(' '))) }} />
                </blockquote>
            );
            continue;
        }

        // Table
        if (line.trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|---')) {
            const headers = line.trim().split('|').filter(c => c.trim()).map(c => c.trim());
            i += 2; // skip header + separator
            const rows = [];
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                const cells = lines[i].trim().split('|').filter(c => c.trim()).map(c => c.trim());
                rows.push(cells);
                i++;
            }
            elements.push(
                <table key={key++}>
                    <thead>
                        <tr>{headers.map((h, hi) => <th key={hi} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(h)) }} />)}</tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri}>{row.map((cell, ci) => <td key={ci} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(cell)) }} />)}</tr>
                        ))}
                    </tbody>
                </table>
            );
            continue;
        }

        // Unordered list
        if (line.trim().startsWith('- ')) {
            const items = [];
            while (i < lines.length && lines[i].trim().startsWith('- ')) {
                items.push(lines[i].trim().replace(/^-\s+/, ''));
                i++;
            }
            elements.push(
                <ul key={key++}>
                    {items.map((item, ii) => (
                        <li key={ii} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(item)) }} />
                    ))}
                </ul>
            );
            continue;
        }

        // Ordered list
        if (/^\d+\.\s/.test(line.trim())) {
            const items = [];
            while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
                i++;
            }
            elements.push(
                <ol key={key++}>
                    {items.map((item, ii) => (
                        <li key={ii} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(item)) }} />
                    ))}
                </ol>
            );
            continue;
        }

        // Paragraph
        let paraLines = [];
        while (i < lines.length && lines[i].trim() !== '' && !lines[i].trim().startsWith('#') && !lines[i].trim().startsWith('- ') && !lines[i].trim().startsWith('> ') && !lines[i].trim().startsWith('|') && !/^\d+\.\s/.test(lines[i].trim())) {
            paraLines.push(lines[i].trim());
            i++;
        }
        if (paraLines.length > 0) {
            elements.push(
                <p key={key++} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(paraLines.join(' '))) }} />
            );
        }
    }

    return elements;
};

/* Format inline markdown: bold, italic, code, links */
const formatInline = (text) => {
    return text
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        // Emoji-style markers
        .replace(/❌/g, '❌')
        .replace(/✅/g, '✅');
};

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // Get related posts (all except current, max 2)
    const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

    return (
        <main>
            <article className="blog-post" style={{ padding: '8rem 2rem 2rem' }}>
                <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <Link to="/blog" className="blog-post__back">
                        ← Back to Blog
                    </Link>

                    <span className="blog-post__category">{post.category}</span>
                    <h1 className="blog-post__title">{post.title}</h1>

                    <div className="blog-post__meta">
                        <span>📅 {post.date}</span>
                        <span>⏱️ {post.readTime}</span>
                    </div>

                    <img src={post.image} alt={post.title} className="blog-post__image" />

                    <div className="blog-post__body">
                        {renderContent(post.content)}
                    </div>
                </div>
            </article>

            {/* RELATED POSTS */}
            <section className="blog-related">
                <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <h2 className="blog-related__title">
                        More <span>Articles</span>
                    </h2>
                    <div className="blog-related__grid">
                        {relatedPosts.map(rp => (
                            <Link to={`/blog/${rp.slug}`} className="blog-card" key={rp.id}>
                                <div className="blog-card__image-wrapper">
                                    <img src={rp.image} alt={rp.title} className="blog-card__image" loading="lazy" />
                                </div>
                                <div className="blog-card__content">
                                    <div className="blog-card__meta">
                                        <span className="blog-card__category">{rp.category}</span>
                                        <span>{rp.readTime}</span>
                                    </div>
                                    <h2 className="blog-card__title">{rp.title}</h2>
                                    <span className="blog-card__readmore">Read Article →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BlogPostPage;
