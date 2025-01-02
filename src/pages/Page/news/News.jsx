import React from "react";
import "./news.css";

const NewsComponent = ({ currentItem, recentArticles, newsArticles }) => {
  return (
    <div>
      <AppRouteshow item={currentItem} />

      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar py-5 border p-4">
              <h4>Recent Articles</h4>
              <ul className="list-unstyled">
                {recentArticles.map((article, index) => (
                  <li key={index} className="media mb-3">
                    <img
                      src={article.image}
                      className="mr-3"
                      alt={article.title}
                      style={{ width: "64px", height: "64px" }}
                    />
                    <div className="media-body">
                      <h5 className="mt-0 mb-1">{article.title}</h5>
                      <p>
                        By {article.author} | {article.date} |{" "}
                        {article.comments} Comments
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="container my-5">
              <div className="row">
                {newsArticles.map((article, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card mb-4">
                      <img
                        src={article.image}
                        className="card-img-top"
                        alt={article.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            By {article.author} | {article.date} |{" "}
                            {article.comments} Comments
                          </small>
                        </p>
                        <a href="/" className="btn btn-primary">
                          READ MORE
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
