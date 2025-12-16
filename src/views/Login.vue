
<script>
import Login from "../components/Login";

export default {
  name: "Login",
  components: {
  Login
  },

  methods : {
  usernameValid() {
    return true;
  },
  passwordValid() {
    return true;
  },
  onLogin() {
    ev.preventDefault();
  },

  login() {
    console.log("YO");
    console.log(this.$auth);
    this.$auth.loginWithRedirect();
  },

  foo() {
    console.log(this.$auth.getTokenSilently());
  }
}
}
</script>
