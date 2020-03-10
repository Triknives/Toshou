import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions.js';

class RegisterModal extends Component {
  state = {
    modal: false,
    name:'',
    email:'',
    password:'',
    msg: null,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
      // Check for register error
      if(error.id === 'REGISTER_FAIL') {
        this.setState({msg: error.msg.msg });
      }else{
        this.setState({msg: null});
      }
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit = (e) => {
    e.preventDefault();

    const {name, email, password} = this.state;

    //Create a User Object
    const newUser = {
      name,
      email,
      password
    };
    // Attempt to Register
    this.props.register(newUser);
}

render(){
  return(
    <div>
    <NavLink onClick={this.toggle} href="#">
    Register
    </NavLink>
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
      >
        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
        <ModalBody>
        { this.state.msg ? (
          <Alert color="danger">{this.state.msg}</Alert>
      ) : null }
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
            <Label for="Name">Name</Label>
              <Input
                className="mb-3"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.onChange}
              />
              <Label for="Email">Email</Label>
                <Input
                  className="mb-3"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                />
                <Label for="Paswword">Password</Label>
                  <Input
                    className="mb-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                <Button color="dark" style={{marginTop:'2rem'}}
                block>
                Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register })(RegisterModal);