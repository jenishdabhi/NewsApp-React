import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [];

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b9397cd12c164192859aca3ee60ee2f2&page=1pageSize=20";
    let data =  await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults})
  }
 
  handlePrevclick = async()=>{
    console.log("previous");
    let url =
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=b9397cd12c164192859aca3ee60ee2f2&page=${this.state.page - 1}&pageSize=20`;
  let data =  await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);

  this.setState({
    page: this.state.page -1,
    articles: parsedData.articles

  })
}

 handleNextclick = async()=>{
    console.log("Next");
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=b9397cd12c164192859aca3ee60ee2f2&page=${this.state.page + 1}&pageSize=20`;
    let data =  await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);

      this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
}

  render() {
    return (
      <div className="container my-3">
        <h1>News - top Headlines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imagUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevclick}>Previous</button>
          <button type="button" className="btn btn-primary" onClick={this.handleNextclick}>Next</button>
          </div>
      </div>
    );
  }
}

export default News;
