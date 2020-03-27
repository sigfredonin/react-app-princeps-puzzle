class PrincepsPuzzle:

    def __init__(self):
        self.q = [
            False for i in range(8)
        ]

    def show(self):
        lights = [ not s for s in self.q ]
        print("LIGHTS: " + str(lights))

    def reset(self):
        self.q = [
            False for i in range(8)
        ]
        self.show()

    def press(self, buttonIndex):
        q = self.q
        jk = [
            True,
            not q[0],
            q[0] and not q[1],
            q[0] and q[1] and not q[2],
            q[0] and q[1] and q[2] and not q[3],
            q[0] and q[1] and q[2] and q[3] and not q[4],
            q[0] and q[1] and q[2] and q[3] and q[4] and not q[5],
            q[0] and q[1] and q[2] and q[3] and q[4] and q[5] and not q[6],
        ]
        if jk[buttonIndex]:
            self.q[buttonIndex] = not self.q[buttonIndex]
            self.show()

    def presses(self, buttonIndices):
        for buttonIndex in buttonIndices:
            self.press(buttonIndex)

    def game(self, buttonIndices):
        self.reset()
        self.presses(buttonIndices)
