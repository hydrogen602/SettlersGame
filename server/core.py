#!/usr/bin/env python3.7

'''
Author: Jonathan Rotter
Server code

Required 3rd-party libraries:
`autobahn`
`twisted`
'''
import sys

# importing the necessary objects
# autobahn does websocket stuff, but relies on twisted
from autobahn.twisted.websocket import \
    WebSocketServerProtocol, WebSocketServerFactory

# twisted does asynchronous code execution needed for websockets
from twisted.python import log
from twisted.internet import reactor  # ,task

IP = '127.0.0.1'

PORT = 5050


class ServerProtocol(WebSocketServerProtocol):

    def onConnect(self, request):

        print(request.path)
        # debug information
        print('Client connecting & registering: {0}'.format(request.peer))
        clientTypeRequest = request.path

        # process the type of request
        if clientTypeRequest.startswith('/'):
            # remove the slash if there is one
            clientTypeRequest = clientTypeRequest[1:]

        # tell the factory to remember the connection
        self.factory.register(self, clientTypeRequest)

    def onOpen(self):
        print('WebSocket connection open')

    def onClose(self, wasClean, code, reason):
        print('WebSocket connection closed: {0}'.format(reason))

        # tell the factory that this connection is dead
        self.factory.unregister(self)

    def onMessage(self, msg, isBinary):
        msg = msg.decode()

        if msg == 'Hi':
            print("Echo")
            self.sendMessage(b"Hello")


class ServerFactory(WebSocketServerFactory):
    '''
    Keeps track of all connections and relays data to other clients
    '''

    def __init__(self, url):
        '''
        Initializes the class
        Args:
            url (str): has to be in the format of "ws://127.0.0.1:8008"
        '''
        WebSocketServerFactory.__init__(self, url)

    def register(self, client, clientTypeRequest):
        pass

    def unregister(self, client):
        pass


if __name__ == '__main__':
    # display debug information to stdout for now
    log.startLogging(sys.stdout)  # TODO: replace with log file (maybe)

    # Setup server factory
    server = ServerFactory(u'ws://{}:{}'.format(IP, PORT))
    server.protocol = ServerProtocol

    # setup listening server
    reactor.listenTCP(PORT, server)

    try:
        # start listening for and handling connections
        reactor.run()
    finally:
        pass
        # if logs are sent to a file instead of stdout
        # the file should be closed here with f.close()
