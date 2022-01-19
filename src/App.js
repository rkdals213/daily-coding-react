import './App.css'
import {Component} from "react"
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"

class App extends Component {
    constructor(props) {
        super(props)
        this.max_content_id = 3
        this.state = {
            mode: "welcome",
            selected_content_id: 2,
            welcome: {
                title: "welcome",
                desc: "Hello React!!"
            },
            subject: {
                title: "WEB",
                sub: "World Wide Web!"
            },
            content: {
                title: "HTML",
                desc: "HTML is HyperText Markup Language."
            },
            contents: [
                {
                    id: 1,
                    title: "HTML",
                    desc: "HTML is HyperText Markup Language."
                },
                {
                    id: 2,
                    title: "CSS",
                    desc: "CSS is for design"
                },
                {
                    id: 3,
                    title: "Javascript",
                    desc: "Javascript is for interactive."
                }
            ]
        }
    }

    getReadContent() {
        for (let i = 0; i < this.state.contents.length; i++) {
            const data = this.state.contents[i]
            if (data.id === this.state.selected_content_id) {
                return data
            }
        }
    }

    getContent() {
        let _title, _desc, _article, _content = null

        if (this.state.mode === "welcome") {
            _title = this.state.welcome.title
            _desc = this.state.welcome.desc
            _article = <ReadContent title={_title} desc={_desc}> </ReadContent>
        } else if (this.state.mode === "read") {
            _content = this.getReadContent()
            _article = <ReadContent title={_content.title} desc={_content.desc}> </ReadContent>
        } else if (this.state.mode === "create") {
            _article = <CreateContent onSubmit={function (_title, _desc) {
                this.max_content_id += 1
                // const _content = this.state.contents.concat({
                //     id: this.max_content_id,
                //     title: _title,
                //     desc: _desc
                // })
                // this.setState({
                //     contents: _content
                // })
                const newContent = Array.from(this.state.contents)
                newContent.push({
                    id: this.max_content_id,
                    title: _title,
                    desc: _desc
                })
                this.setState({
                    contents: newContent
                })
            }.bind(this)}> </CreateContent>
        } else if (this.state.mode === "update") {
            _content = this.getReadContent()
            _article =
                <UpdateContent
                    data={_content}
                    onSubmit={function (_id, _title, _desc) {
                        const _contents = Array.from(this.state.contents)
                        for (let i = 0; i < _contents.length; i++) {
                            if (_contents[i].id === _id) {
                                _contents[i] = {
                                    id: _id,
                                    title: _title,
                                    desc: _desc
                                }
                                break
                            }
                        }
                        this.setState({
                            contents: _contents
                        })
                    }.bind(this)}>
                </UpdateContent>
        }
        return _article
    }

    render() {
        console.log("App Render")

        console.log("render", this)
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function () {
                        this.setState({
                            mode: "welcome"
                        })
                    }.bind(this)}
                >
                </Subject>
                <TOC
                    onChangePage={function (id) {
                        this.setState({
                            mode: "read",
                            selected_content_id: Number(id)
                        })
                    }.bind(this)}
                    data={this.state.contents}
                >
                </TOC>
                <Control
                    onChangeMode={function (_mode) {
                        if (_mode === "delete") {
                            if (window.confirm("정말 삭제하시겠습니까")){
                                const _contents = Array.from(this.state.contents)
                                for (let i = 0; i < _contents.length; i++) {
                                    if (_contents[i].id === this.state.selected_content_id) {
                                        _contents.splice(i, 1)
                                        break
                                    }
                                }
                                this.setState({
                                    mode: "welcome",
                                    contents: _contents
                                })
                            }
                        } else {
                            this.setState({
                                mode: _mode
                            })
                        }
                    }.bind(this)}
                >

                </Control>
                {this.getContent()}
            </div>
        )
    }
}

export default App;
