FROM node:10.1.0


MAINTAINER Kevin Martin <21.kmart@gmail.com>


# Create our Botkit directories
RUN mkdir -p /opt/botkit \
    mkdir -p /opt/botkit/services \
    mkdir -p /opt/botkit/skills


# Copy files to working directory
COPY ./package.json /opt/botkit/


# Install the dependancies
RUN cd /opt/botkit && npm install


# Copy files to working directory
COPY ./*.* /opt/botkit/
COPY ./services/*.* /opt/botkit/services/
COPY ./skills/*.* /opt/botkit/skills/


# Set the working directory to /opt/botkit
WORKDIR /opt/botkit


# Start the bot
CMD ["npm", "start"]