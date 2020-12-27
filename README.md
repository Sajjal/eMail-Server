[![GitHub stars](https://img.shields.io/github/stars/Sajjal/eMail-Server)](https://github.com/Sajjal/eMail-Server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Sajjal/eMail-Server)](https://github.com/Sajjal/eMail-Server/issues)
![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Fmail.mrsajjal.com)
![GitHub language count](https://img.shields.io/github/languages/count/Sajjal/eMail-Server)
![GitHub top language](https://img.shields.io/github/languages/top/Sajjal/eMail-Server)
![GitHub repo size](https://img.shields.io/github/repo-size/Sajjal/eMail-Server)

# Welcome to S & D eMail-Server!

### Thank you for exploring S & D eMail-Server.

It is a web-based lightweight Email Server application that consumes SendGrid API and provides nice user interface for sending and receiving emails from personal Domains.

This application is developed using Node.js and Express.js on backend and VueJS on frontend. MongoDB is used as a database. The user interface is minimal.

---

## Background (_Why this application was developed?_)

I feel the need of a personal email for my website: [https://mrsajjal.com](https://mrsajjal.com) and I was looking for the available options. Back in the days, Google's G-Suite free edition would be the obvious choice but since 2012 Google stopped providing the free edition of G-Suite, and the business edition is not required for my personal use case. After some research, I found that there are plenty but not so obvious options available for personal (domain-specific) emails.

Twilio SendGrid and Amazon Simple Email Service (SES) are some reliable options. Since Amazon SES does not provide free tier service to applications hosted outside of Amazon EC2, I decided to move forward with Twilio SendGrid. SendGrid allows to send 100 emails/day on its free plan and it is more than enough for me. I do not find any information on the limit of inbound emails.

After the initial setup, I found that it is not so pleasant experience to send and receive emails using the Command Line Interface. Sending is still okay but reading incoming HTML emails in a terminal window is a nightmare. Therefore, I decided to create a complete email server with a nice user interface to send and receive email consuming SendGrid's API, and here it is.

## Prerequisites:

### Virtual Server:

- Setup a Virtual Server on any cloud provider of your choice
- Install and configure HTTP Server to accept HTTP/HTTPS connection

### Domain Name:

- Obtain a Domain Name of your choice from any Domain name registrar
- Point the A record of your Domain to your server's public IP address
- Configure Reverse Proxy on your HTTP server and forward your Domain to port 3000

### SendGrid:

- Create SendGrid Account
- Authenticate your Domain
- Settings ---> Create API key ---> Restricted Access ---> Enable Mail Send ---> Create and View
- Settings ---> Inbound Parse ---> Add Host & URL ---> Choose your Domain
- Input `http://yourYourDomain/inbox` on Destination URL
- Leave all other options as it is and click Add

### Node.js:

- Install **Node.js** on your Virtual Server

### MongoDB:

- Install **MongoDB** on your Virtual Server

---

## Installation:

- Clone this Project
- **cd** to the 'BackEndExpress' directory
- Modify the value of `SENDGRID_API_KEY`, `TOKEN_SECRET`, `ACCESS_CODE`, `DB`, on `.env` file

  > **Note:** `.env` file might be hidden

- Open terminal/command-prompt and type:

      	i. npm install

      	ii. npm start

- Type `http://yourDomainName` on your browser's address bar and hit Enter. **The server is live.**

> **Important:** You can send and receive email using `anyThing@yourDomainName.` Only emails sent from `anyThing@yourDomainName` will be delivered to the recipient.

---

## eMail-Server Flow Chart:

<img src="https://github.com/Sajjal/eMail-Server/blob/master/FrontEndVue/public/screenShots/flowChart.svg">

---

## Demo:

**Login Page:**

<img src="https://github.com/Sajjal/eMail-Server/blob/master/FrontEndVue/public/screenShots/login.png">

---

**Email List:**

<img src="https://github.com/Sajjal/eMail-Server/blob/master/FrontEndVue/public/screenShots/emailList.png">

---

**Compose New Email:**

<img src="https://github.com/Sajjal/eMail-Server/blob/master/FrontEndVue/public/screenShots/compose.png">

---

**Display Email:**

<img src="https://github.com/Sajjal/eMail-Server/blob/master/FrontEndVue/public/screenShots/email.png">

---

With Love,

**Sajjal**
