import socket

def send_message(host:str,port: int, message:bytes):
    server_socket = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
    server_socket.sendto(message, (host, port))

if __name__ == '__main__':
    HOST = 'localhost'
    PORT = 9000

name = input('Escreva seu nome: ')

while True:
    message = input('Escreva sua mensagem: ')

    body_message = f"{name} != {message}".encode('utf-8')

    send_message(HOST, PORT, body_message)