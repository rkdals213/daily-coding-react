import './App.css'
import {Component} from "react"
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import CreateContent from "./components/CreateContent"

class App extends Component {
    constructor(props) {
        super(props)
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

    render() {
        console.log("App Render")

        let _title, _desc, _article = null

        if (this.state.mode === "welcome") {
            _title = this.state.welcome.title
            _desc = this.state.welcome.desc
            _article = <ReadContent title={_title} desc={_desc}> </ReadContent>
        } else if (this.state.mode === "read") {
            for (let i = 0; i < this.state.contents.length; i++) {
                const data = this.state.contents[i]
                if (data.id === this.state.selected_content_id) {
                    _title = data.title
                    _desc = data.desc
                    break
                }
            }
            _article = <ReadContent title={_title} desc={_desc}> </ReadContent>
        } else if (this.state.mode === "create") {
            _article = <CreateContent title={_title} desc={_desc}> </CreateContent>
        }

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
                        this.setState({
                            mode: _mode
                        })
                    }.bind(this)}
                >

                </Control>
                {_article}
            </div>
        )
    }
}

export default App;
