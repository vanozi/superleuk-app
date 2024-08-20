from .base_page import BasePage

class LoginPage(BasePage):
    username_input = '//input[@id="username"]'
    password_input = '//input[@id="password"]'
    submit_button = '//input[@id="_submit"]'
