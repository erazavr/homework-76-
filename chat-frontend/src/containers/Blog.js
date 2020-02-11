import React, {Component} from 'react';
import {
    Button,
    Col,
    Container, Form,
    FormGroup, Input,
    Row
} from "reactstrap";
import Post from "../component/Post";
import {connect} from "react-redux";
import {getMessage, getMessagesByDate, sendMessage} from "../store/action";


class Blog extends Component {
    lastDateTime = null;
    interval = null;
    state = {
        author: '',
        message: '',
    };

    componentDidMount() {
       this.interval = setInterval(() => {
            this.getMessages()
        }, 2000)
    };

    renderOnPage = () => {
        return Object.keys(this.props.messages).map(id => (
            <Post
                key={this.props.messages[id].id}
                datetime={this.props.messages[id].datetime}
                author={this.props.messages[id].author}
                message={this.props.messages[id].message}
            />
        ))
    };

    getMessages = async (datetime) => {
        if (datetime === null || datetime === undefined) {
            await this.props.getMessage()
        } else {
            await this.props.getMessagesByDate(this.lastDateTime)
        }
            let messages = this.props.messages;
            this.lastDateTime = messages[messages.length - 1].datetime;
        };

    sendMessages = async (e) => {
      e.preventDefault();
      if (this.state.author === '' || this.state.message === '') {
          alert('Author and message must be present in the request')
      }else {
          const newMessage = {
              author: this.state.author,
              message: this.state.message
          };
          await this.props.sendMessage(newMessage);
      }

    };

    componentDidUpdate() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.getMessages(this.lastDateTime)
        }, 2000)
    }

    inputValueChanged = event => this.setState({[event.target.name]: event.target.value});
    render() {
        return (
            <Container>
                {this.renderOnPage()}
                <Form onSubmit={this.sendMessages}>
                    <Row>
                        <Col xs={5}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="message"
                                    id="message"
                                    placeholder="Enter your message"
                                    style={{border: '2px solid #007bff'}}
                                    onChange={this.inputValueChanged}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={5}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="author"
                                    id="message"
                                    placeholder="Enter your name"
                                    style={{border: '2px solid #007bff'}}
                                    onChange={this.inputValueChanged}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={2}>
                            <Button color="primary">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    messages: state.messages,
    date: state.date,
    error: state.error
});
const mapDispatchToProps = dispatch => ({
    getMessage: () => dispatch(getMessage()),
    sendMessage: message => dispatch(sendMessage(message)),
    getMessagesByDate: date => dispatch(getMessagesByDate(date))
});
export default connect(mapStateToProps, mapDispatchToProps)(Blog);