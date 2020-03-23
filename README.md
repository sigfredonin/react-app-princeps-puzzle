## Princeps Puzzle

This is a React App implementation of the electronic version of a Chinese rings puzzle as described in --

"The Princeps Puzzle." James W. Cuccia, *Popular Electronics*, Vol. 34, May 1971, pages 26-32.

### Chinese Rings Puzzle

Martin Gardner, in the chapter about Gray codes of his book *Knotted doughnuts and other mathematical entertainments* (1986, W. H. Freeman and Company), describes a puzzle known as Chinese rings, made from bent wires as shown here:

![Chinese rings puzzle](https://github.com/sigfredonin/react-app-princeps-puzzle/chinese-rings.jpg "Chinese rings puzzle")

The objective is to remove the rings from the double bar threaded through them,
which is not as easy as it appears at first glance because of their connection to the other bar to which they are all attached. Except for the first two rings, which can be removed together, a ring can only be removed if the ring next to it closer to the end is on the bar, but all the rings beyond are off the bar.

### Popular Electronics Circuit

The Popular Electronics article includes this circuit diagram, which I have annotated with logic levels at selected locations --

![circuit diagram](https://github.com/sigfredonin/react-app-princeps-puzzle/circuit-diagram.jpg "Princeps Puzzle circuit")

The puzzle state is stored in the JK flip-flops Q1-Q8.  The RESET button pulses the CLEAR input of all the flip-flops, setting them all to zero.  Each light turns on if the corresponding flip-flop is zero (~Q is high), so RESET turns on all of the lights.  Each push button pulses the CLOCK input of its flip-flop, which causes the flip-flop to change state if the J and K inputs are both high (true).  the logic that determines the J and K input of each flip-flop is shown in this table --

![JK inputs logic table](https://github.com/sigfredonin/react-app-princeps-puzzle/JK-inputs.png "JK Inputs Table")

### React App

The React app has a *game* component that maintains state corresponding to the flip-flops.  Each time a button corresponding to one of the lights is pressed, the game component commputes the JK inputs to each flip-flop, then computes the new state, changing the flip-flop corresponding to the pressed button if its JK inputs are *true*.

### Python Code

This Python implementation directly transcribes the circuit logic. The instance variable *q* represents the flip-flops. The variable *jk* represents the J and K inputs to the flip-flops. The function *press()* computes the result of pressing a button and pulsing the CLOCK input of a particular flip-flop. The function *reset()* computes the result of pushing the RESET button and pulsing the CLEAR input of all of the flip-flops: this returns the puzzle to its initial state with all
of the flip-flops set to 0 and all of the lights on. The function *game()* resets the puzzle then computes and displays the light states resulting from a sequence of button presses.

```python
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
```

#### Sample Game

The sample game shows the sequence of light states for 11 moves. A solution to the puzzle is a game that ends with the lights all off. A further solution would be a game that turns off all the lights, then turns them all on again.

```
>>> puzzle = PrincepsPuzzle()
>>> puzzle.game([1,0,3,0,1,0,2,0,1,0,5])
LIGHTS: [True, True, True, True, True, True, True, True]
LIGHTS: [True, False, True, True, True, True, True, True]
LIGHTS: [False, False, True, True, True, True, True, True]
LIGHTS: [False, False, True, False, True, True, True, True]
LIGHTS: [True, False, True, False, True, True, True, True]
LIGHTS: [True, True, True, False, True, True, True, True]
LIGHTS: [False, True, True, False, True, True, True, True]
LIGHTS: [False, True, False, False, True, True, True, True]
LIGHTS: [True, True, False, False, True, True, True, True]
LIGHTS: [True, False, False, False, True, True, True, True]
LIGHTS: [False, False, False, False, True, True, True, True]
LIGHTS: [False, False, False, False, True, False, True, True]
>>> 
```