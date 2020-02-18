import { recordReplayCommands } from "../support/recordReplayCommands";

describe("Account - Login Layout Test", () => {
  it("Login Page Default View", () => {
    cy.visit("login");
    cy.location("pathname").should("eq", "/login");

    cy.percySnapshot();
  });

  it("Signup Page Default View", () => {
    cy.visit("signup");
    cy.location("pathname").should("eq", "/signup");

    cy.percySnapshot();
  });
});

describe("Navigation: Login and Create Account Pages", () => {
  it("Login to Signup", () => {
    cy.visit("login");
    cy.location("pathname").should("eq", "/login");

    cy.get('[data-cy="createAccountLink"]')
      .should("have.text", "create account")
      .click();

    cy.location("pathname").should("eq", "/signup");
  });

  it("Signup to Login", () => {
    cy.visit("signup");
    cy.location("pathname").should("eq", "/signup");

    cy.get('[data-cy="loginLink')
      .should("have.text", "login to existing account")
      .click();

    cy.location("pathname").should("eq", "/login");
  });
});

describe("Verify Login and Create Account", () => {
  const userName = "au0muoxay6jshfn9hwiwi8@uitest.com";
  const password = "r5zjxp8vmqrb5tbdodjfp";

  beforeEach(() => {
    cy.server();
    cy.route({
      url: "/user/identity",
      status: 200,
      method: "GET",
      response: {
        createdAt: 1551738475242,
        updatedAt: 1551738475242,
        id: 1,
        email: userName
      }
    }).as("identity");

    cy.route({
      url: "/todo",
      method: "GET",
      status: 200,
      response: []
    }).as("todo");
  });

  it("Should Create Account", () => {
    cy.route({
      url: "/user",
      status: 200,
      method: "POST",
      response: {
        createdAt: 1552670656025,
        updatedAt: 1552670656025,
        id: 3,
        email: userName
      }
    }).as("signup");

    cy.visit("/signup")
      .location("pathname")
      .should("eq", "/signup");

    cy.get('[data-cy="email"]').type(userName);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="signupBtn"]')
      .should("have.text", "Sign Up")
      .click()
      .wait("@signup")
      .wait("@identity")
      .wait("@todo")
      .location("pathname")
      .should("eq", "/");
  });
  it("Should have logged in username in header", () => {
    cy.get('[data-cy="rightMenu"] .nav-link')
      .eq(0)
      .should("have.text", `Welcome ${userName}`)
      .percySnapshot("Home Page - Signed In Default View");
  });

  it("Should logout user", () => {
    cy.route({
      url: "/user/logout",
      method: "GET",
      status: 200,
      response: "Ok"
    }).as("logout");

    cy.get('[data-cy="rightMenu"] .nav-link')
      .eq(1)
      .should("have.text", "logout")
      .click()
      .wait("@logout");

    cy.location("pathname").should("eq", "/login");

    cy.get('[data-cy="rightMenu"] .nav-link')
      .eq(1)
      .should("not.be.visible");
  });

  it("Should login user", () => {
    cy.route({
      url: "/user/login",
      status: 200,
      method: "PUT",
      response: {
        createdAt: 1551738475242,
        updatedAt: 1551738475242,
        id: 1,
        email: userName
      }
    }).as("login");

    cy.get('[data-cy="email"]').type(userName);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="loginBtn"]')
      .should("have.text", "Login")
      .click()
      .wait("@login")
      .wait("@identity")
      .wait("@todo")
      .location("pathname")
      .should("eq", "/");
  });

  it("Should give invalid login upon login to non-existent account", () => {
    cy.route({
      url: "/user/login",
      method: "PUT",
      status: 401,
      response: "Forbidden"
    }).as("login-invalid");

    cy.visit("/login")
      .location("pathname")
      .should("eq", "/login");

    const bogusUserName = `${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random()
      .toString(36)
      .substring(2, 15)}@uitest.com`;
    const bogusPassword =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    cy.get('[data-cy="email"]').type(bogusUserName);
    cy.get('[data-cy="password"]').type(bogusPassword);
    cy.get('[data-cy="loginBtn"]')
      .should("have.text", "Login")
      .click();

    cy.wait("@login-invalid");

    cy.get('[data-cy="loginErrorMsg"]').should("have.text", "Invalid Login");
  });
});

describe("Verify Form Validation", () => {
  describe("Login Form Validation", () => {
    before(() => {
      cy.visit("/login");
    });

    describe("Email Validation", () => {
      it("Is Required", () => {
        cy.get('[data-cy="email"]')
          .focus()
          .blur()
          .get('[data-cy="emailValidation"]')
          .should("contain", "Email is required")
          .should("be.visible")
          .get('[data-cy="loginBtn"]')
          .should("be.disabled")
          .percySnapshot("Login Page - Email Is Required");
      });

      it("Must Be An Email", () => {
        cy.get('[data-cy="email"]')
          .type("1")
          .get('[data-cy="emailValidation"]')
          .should("contain", "Must be an email")
          .should("be.visible")
          .get('[data-cy="loginBtn"')
          .should("be.disabled")
          .percySnapshot("Login Page - Must be an Email");
      });

      it("Is Required After Clearing Email Field", () => {
        cy.get('[data-cy="email"]')
          .clear()
          .get('[data-cy="emailValidation"]')
          .should("contain", "Email is required")
          .should("be.visible")
          .get('[data-cy="loginBtn"]')
          .should("be.disabled");
      });

      it("Is Valid", () => {
        cy.get('[data-cy="email"]')
          .type("123@foo.com")
          .get('[data-cy="emailValidation"]')
          .should("not.be.visible")
          .get('[data-cy="loginBtn"]')
          .should("be.disabled");

        cy.percySnapshot("Login Page - Email Is Valid");
      });
    });

    describe("Password Validation", () => {
      it("Required", () => {
        cy.get('[data-cy="password"]')
          .focus()
          .blur()
          .get('[data-cy="passwordValidation"]')
          .should("contain", "Password is required")
          .should("be.visible")
          .get('[data-cy="loginBtn"]')
          .should("be.disabled")
          .percySnapshot("Login Page - Password is required");
      });

      it("Must Be > 6 Characters", () => {
        cy.get('[data-cy="password"]')
          .type("1")
          .get('[data-cy="passwordValidation"]')
          .should("contain", "Password must be at least 6 characters long")
          .should("be.visible")
          .get('[data-cy="loginBtn"]')
          .should("be.disabled")
          .percySnapshot("Login Page - Password must be at least 6 characters");
      });

      it("Required after clearing password field", () => {
        cy.get('[data-cy="password"]')
          .clear()
          .get('[data-cy="passwordValidation"]')
          .should("contain", "Password is required")
          .should("be.visible")
          .get('[data-cy="loginBtn"]')
          .should("be.disabled");
      });

      it("Is Valid", () => {
        cy.get('[data-cy="password"]')
          .type("123456")
          .wait(300)
          .percySnapshot("Login Page - Email and Password is Valid")
          .get('[data-cy="passwordValidation"]')
          .should("not.be.visible")
          .get('[data-cy="loginBtn"]')
          .should("not.be.disabled");
      });
    });
  });

  describe("Signup Form Validation", () => {
    before(() => {
      cy.visit("/signup");
    });

    describe("Email Validation", () => {
      it("Required", () => {
        cy.get('[data-cy="email"]')
          .focus()
          .blur()
          .get('[data-cy="emailValidation"]')
          .should("contain", "Email is required")
          .should("be.visible")
          .get('[data-cy="signupBtn"]')
          .should("be.disabled")
          .percySnapshot("Signup Page - Email is Required");
      });

      it("Must be Email", () => {
        cy.get('[data-cy="email"]')
          .type("1")
          .get('[data-cy="emailValidation"]')
          .should("contain", "Must be an email")
          .should("be.visible")
          .get('[data-cy="signupBtn"')
          .should("be.disabled")
          .percySnapshot("Signup Page - Must be an email");
      });

      it("Required after clearing email field", () => {
        cy.get('[data-cy="email"]')
          .clear()
          .get('[data-cy="emailValidation"]')
          .should("contain", "Email is required")
          .should("be.visible")
          .get('[data-cy="signupBtn"]')
          .should("be.disabled");
      });

      it("Is Valid", () => {
        cy.get('[data-cy="email"]')
          .type("123@foo.com")
          .get('[data-cy="emailValidation"]')
          .should("not.be.visible")
          .get('[data-cy="signupBtn"]')
          .should("be.disabled")
          .percySnapshot("Signup Page - Email is Valid");
      });
    });

    describe("Password Validation", () => {
      it("Required", () => {
        cy.get('[data-cy="password"]')
          .focus()
          .blur()
          .get('[data-cy="passwordValidation"]')
          .should("contain", "Password is required")
          .should("be.visible")
          .get('[data-cy="signupBtn"]')
          .should("be.disabled")
          .percySnapshot("Signup Page - Password is required");
      });

      it("Must be > 6 characters", () => {
        cy.get('[data-cy="password"]')
          .type("1")
          .get('[data-cy="passwordValidation"]')
          .should("contain", "Password must be at least 6 characters long")
          .should("be.visible")
          .get('[data-cy="signupBtn"]')
          .should("be.disabled")
          .percySnapshot("Signup Page - Password must be 6 characters");
      });

      it("Required after clearing password field", () => {
        cy.get('[data-cy="password"]')
          .clear()
          .get('[data-cy="passwordValidation"]')
          .should("contain", "Password is required")
          .should("be.visible")
          .get('[data-cy="signupBtn"]')
          .should("be.disabled");
      });

      it("Is Valid", () => {
        cy.get('[data-cy="password"]')
          .type("123456")
          .get('[data-cy="passwordValidation"]')
          .should("not.be.visible")
          .get('[data-cy="signupBtn"]')
          .should("not.be.disabled");

        cy.percySnapshot("Signup Page - Email and Password are Valid");
      });
    });
  });
});
