class PrincepsPuzzle:

    def __init__(self):
        self.lights = 0b11111111

    def show(self):
        lights = [ ((self.lights << i) & 0b10000000) == 0b10000000
                   for i in range(8) ]
        print("LIGHTS: " + str(lights))

    def reset(self):
        self.lights = 0b11111111
        self.show()

    def mask(self, lightIndex):
        return 0b10000000 >> lightIndex

    def canChange(self, buttonIndex):
        return (buttonIndex == 0) or ((self.lights >> (8-buttonIndex)) == 1)

    def press(self, buttonIndex):
        if self.canChange(buttonIndex):
            self.lights = self.lights ^ self.mask(buttonIndex)
        self.show()

    def presses(self, buttonIndices):
        for buttonIndex in buttonIndices:
            self.press(buttonIndex)

    def game(self, buttonIndices):
        self.reset()
        self.presses(buttonIndices)
