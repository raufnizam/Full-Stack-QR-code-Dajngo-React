import qrcode

img = qrcode.make("Hello World! This is NeuralNine!")
img.save("myCode.png")