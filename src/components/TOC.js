import {Component} from "react";

class TOC extends Component {
    render() {
        console.log("TOC Render")

        const data = this.props.data
        const list = []
        for (let i = 0; i < data.length; i++) {
            list.push(
                <li key={data[i].id}>
                    <a
                        href={"/content/" + data[i].id}
                        onClick={function (id, e) {
                            e.preventDefault()
                            this.props.onChangePage(id)
                        }.bind(this, data[i].id)}
                    >
                        {data[i].title}
                    </a> : {data[i].desc}
                </li>)
        }

        return (
            <nav>
                <ul>
                    {list}
                </ul>
            </nav>
        )
    }
}

export default TOC