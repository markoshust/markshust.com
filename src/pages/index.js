import React from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteSubtitle = data.site.siteMetadata.description
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} subtitle={siteSubtitle} title={siteTitle}>
        <SEO
          title={siteTitle}
          description={siteSubtitle}
          keywords={[`magento`, `magento 2`, `php`, `javascript`, `laravel`, `react`, `reactjs`, `docker`, `mark shust`]}
        />
        <hr />
        <Bio />
        <p style={{ 
          fontFamily:`Montserrat,sans-serif`,
          marginTop:0,
          fontWeight:200,
          fontSize:rhythm(1.5),
         }}>Most Recent Blog Posts:</p>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                  fontFamily: `Montserrat, sans-serif`,
                  fontSize: rhythm(1.25),
                }}
              >
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <time
                style={{ 
                  display: `block`,
                  marginBottom: rhythm(0.5),
                  marginTop: rhythm(0),
                  color: '#aaa'
                }}
                dateTime={node.frontmatter.date}
              >{node.frontmatter.date}</time>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
        <hr style={{ marginTop: rhythm(2), marginBottom: rhythm(1) }} />
        <div style={{ marginTop: rhythm(3) }}>
          Looking for something else? <Link to="/tags">Browse all tags</Link>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 10) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
