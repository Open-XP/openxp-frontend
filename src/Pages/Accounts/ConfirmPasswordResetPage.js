import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouterHooks } from "../../withRouters/withRoutersHook";
import PropTypes from "prop-types";
import HideIcon from "../../icons/hide.png";
import ViewIcon from "../../icons/view.png";
import { confirmPassword } from "../../Actions/Auth";

class ConfirmPasswordResetPage extends Component {
  state = {
    password: "",
    confirm_password: "",
    showPassword: false,
  };

  static propTypes = {
    confirmPassword: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    resetStatus: PropTypes.string,
    navigate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log("Props: ", this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetStatus !== this.props.resetStatus && this.props.resetStatus === "success") {
      this.props.createMessage({
        passwordReset: "Password Reset Successful",
      });
      
      this.props.navigate('/login');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { password, confirm_password } = this.state;
    const { location } = this.props;

    const pathParts = location.pathname.split("/");
    const uidb64 = pathParts[pathParts.length - 3];
    const token = pathParts[pathParts.length - 2];

    this.props.confirmPassword(uidb64, token, password, confirm_password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { password, confirm_password, showPassword } = this.state;

    return (
      <div className="flex w-full h-full justify-center">
        <div className="flex flex-col w-[90rem] h-screen items-center gap-[4rem] justify-center">
          <div className="flex flex-col w-[31.5rem] h-[6.313rem] items-center gap-[0.8rem]">
            <div className="font-[700] text-[2.5rem] font-sans leading-[3.404rem]">
              Reset Password
            </div>
            <div className="font-[500] text-[1.5rem] leading-[2.043rem]">
              have an account?{" "}
              <Link to={"/login"} className="text-skyblue-secondary">
                Log in
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-[74.75rem] h-[65.125rem] items-center pt-[5rem] gap-[0.938rem] shadow-custom2">
            <form onSubmit={this.onSubmit}>
              <div className="flex flex-col w-[65.688rem] h-[23.438rem] gap-[0.938rem]">
                <div className="flex flex-col gap-[0.625rem]">
                  <div className="flex pl-[0.5rem] font-[700] text-[1.5rem] leading-[2.043rem] justify-between">
                    <div>
                      Password
                      <span className="text-red-700 items-center"> *</span>
                    </div>
                    <div className="flex gap-[0.938rem] items-center pr-[1rem]">
                      <div className="font-[500] text-[1.5rem] leading-[2.043rem] ">
                        Show Password
                      </div>
                      <button
                        className="flex w-[1.938rem] h-[1.356rem] items-center"
                        type="button"
                        onClick={this.toggleShowPassword}
                      >
                        {showPassword ? (
                          <img src={HideIcon} alt="Hide" />
                        ) : (
                          <img src={ViewIcon} alt="View" />
                        )}
                      </button>
                    </div>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    autoComplete="off"
                    placeholder="Password"
                    className="w-full h-[3.125rem] border-none bg-[#E9F0FA] rounded-[0.625rem] pl-[1.25rem] text-[1.5rem] font-[600] font-sans flex items-center"
                  />
                </div>
                <div className="flex flex-col gap-[0.625rem]">
                  <div className="pl-[0.5rem] font-[700] text-[1.5rem] leading-[2.043rem]">
                    Confirm Password
                    <span className="text-red-700 items-center"> *</span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm_password"
                    value={confirm_password}
                    onChange={this.onChange}
                    autoComplete="off"
                    placeholder="Confirm Password"
                    className="w-full h-[3.125rem] border-none bg-[#E9F0FA] rounded-[0.625rem] pl-[1.25rem] text-[1.5rem] font-[600] font-sans flex items-center"
                  />
                </div>
                <div className="flex flex-col gap-[1.625rem]">
                  <button
                    type="submit"
                    className="w-[9.438rem] h-[3.438rem] font-sans font-[700] text-[1.438rem] leading-[2.043rem] bg-[#D9D9D952] bg-opacity-32 rounded-xl"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resetStatus: state.auth.resetStatus,
});

export default withRouterHooks(connect(mapStateToProps, { confirmPassword })(ConfirmPasswordResetPage));
