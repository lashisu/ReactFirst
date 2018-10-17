import * as React from "react";
import { Button } from "reactstrap";

import "./facebookLogin.css";

interface IFacebookLoginProps {
  authType?: string;
  appId: string;
  xfbml?: boolean;
  cookie?: boolean;
  version?: string;
  autoLoad: boolean;
  state?: string;
  disableMobileRedirect?: boolean;
  isMobile?: boolean;
  language?: string;
  fields?: string;
  callback: any;
  onFailure?: any;
  responseType?: string;
  returnScopes?: boolean;
  redirectUri?: string;
  scope?: string;
}

interface IFacebookLoginStates {
  isProcessing: boolean;
  isSdkLoaded: boolean;
}

let isMounted: boolean = false;

class FacebookLogin extends React.Component<
  IFacebookLoginProps,
  IFacebookLoginStates
> {
  public static defaultProps = {
    authType: "",
    cookie: false,
    disableMobileRedirect: false,
    fields: "name",
    language: "en_US",
    onFailure: null,
    redirectUri: typeof window !== "undefined" ? window.location.href : "/",
    responseType: "code",
    returnScopes: false,
    scope: "public_profile,email",
    state: "facebookdirect",
    version: "2.3",
    xfbml: false
  };

  constructor(props: IFacebookLoginProps) {
    super(props);
    this.state = {
      isProcessing: false,
      isSdkLoaded: false
    };
  }

  public setStateIfMounted = (newState: any) => {
    if (isMounted) {
      this.setState(newState);
    }
  };

  public responseApi = (authResponse: any) => {
    console.log(authResponse);
    (window as any).FB.api(
      "/me",
      { locale: this.props.language, fields: this.props.fields },
      (me: any) => {
        Object.assign(me, authResponse);
        this.props.callback(me);
      }
    );
  };

  public checkLoginState = (response: any) => {
    this.setStateIfMounted({ isProcessing: false });
    console.log(response);
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.onFailure) {
        this.props.onFailure({ status: response.status });
      } else {
        this.props.callback({ status: response.status });
      }
    }
  };

  public checkLoginAfterRefresh = (response: any) => {
    if (response.status === "connected") {
      this.checkLoginState(response);
    } else {
      (window as any).FB.login(
        (loginResponse: any) => this.checkLoginState(loginResponse),
        true
      );
    }
  };

  public setFbAsyncInit = () => {
    const { appId, xfbml, cookie, version, autoLoad, state } = this.props;
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        appId,
        cookie,
        version: `v${version}`,
        xfbml
      });
      this.setStateIfMounted({ isSdkLoaded: true });
      if (
        autoLoad ||
        window.location.search.indexOf(state || "facebookdirect") !== -1
      ) {
        (window as any).FB.getLoginStatus(this.checkLoginAfterRefresh);
      }
    };
  };

  public sdkLoaded = () => {
    this.setState({ isSdkLoaded: true });
  };

  public loadSdkAsynchronously = () => {
    const { language } = this.props;
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      (js as any).src = `https://connect.facebook.net/${language}/sdk.js#xfbml=1&version=v3.1`;
      (fjs as any).parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  public componentDidMount() {
    isMounted = true;
    if (document.getElementById("facebook-jssdk")) {
      this.sdkLoaded();
      return;
    }
    this.setFbAsyncInit();
    this.loadSdkAsynchronously();
    let fbRoot = document.getElementById("fb-root");
    if (!fbRoot) {
      fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }
  }

  public componentWillUnmount() {
    isMounted = false;
  }

  public getParamsFromObject = (params: any) =>
    "?" +
    Object.keys(params)
      .map(param => `${param}=${encodeURIComponent(params[param])}`)
      .join("&");

  public onClick = (e: any) => {
    if (!this.state.isSdkLoaded || this.state.isProcessing) {
      return;
    }

    this.setState({ isProcessing: true });
    const {
      appId,
      authType,
      disableMobileRedirect,
      redirectUri,
      responseType,
      returnScopes,
      scope,
      state
    } = this.props;

    // if (typeof onClick === "function") {
    //   onClick(e);
    if (e.defaultPrevented) {
      return;
    }
    // }

    const params = {
      auth_type: authType,
      client_id: appId,
      redirect_uri: redirectUri,
      response_type: responseType,
      return_scopes: returnScopes,
      scope,
      state
    };

    if (this.props.isMobile && !disableMobileRedirect) {
      window.location.href = `//www.facebook.com/dialog/oauth${this.getParamsFromObject(
        params
      )}`;
    } else {
      (window as any).FB.login(this.checkLoginState, {
        auth_type: params.auth_type,
        return_scopes: returnScopes,
        scope
      });
    }
  };

  public render() {
    return (
      <div className="Home">
        <div className="lander">
          <Button className="btnFacebook" onClick={this.onClick}>
            Login with Facebook
          </Button>
        </div>
      </div>
    );
  }
}

export default FacebookLogin;
