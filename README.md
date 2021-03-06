## Princeps Puzzle

This is a React App implementation of the electronic version of a Chinese rings puzzle as described in --

"The Princeps Puzzle." James W. Cuccia, *Popular Electronics*, Vol. 34, May 1971, pages 26-32.

### Chinese Rings Puzzle

Martin Gardner, in the chapter about Gray codes of his book *Knotted doughnuts and other mathematical entertainments* (1986, W. H. Freeman and Company), describes a puzzle known as Chinese rings, made from bent wires as shown here:

![Chinese rings puzzle](https://github.com/sigfredonin/react-app-princeps-puzzle/blob/master/chinese-rings.jpg "Chinese rings puzzle")

The objective is to remove the rings from the double bar threaded through them. This is not as easy as it appears at first glance, because of their connection to the other bar to which they are all attached. Except for the first two rings, which can be removed together, a ring can only be removed if the ring next to it closer to the end is on the bar, but all the rings beyond are off the bar.

### Popular Electronics Circuit

Martin Gardner described the Princeps Puzzle as “an elaborate electronic version of the puzzle, with eight lights and eight push buttons.” An illuminated light represents a ring on the bar, and the corresponding push button enables the player to attempt to remove it.  There is also a RESET button that returns the puzzle to its initial state with all of the lights on.

The Popular Electronics article includes this circuit diagram, which I have annotated with logic levels at selected locations --

![circuit diagram](https://github.com/sigfredonin/react-app-princeps-puzzle/blob/master/circuit-diagram.jpg "Princeps Puzzle circuit")

The puzzle state is stored in the JK flip-flops Q1-Q8.  The RESET button pulses the CLEAR input of all the flip-flops, setting them all to zero.  Each light turns on if the corresponding flip-flop is zero (~Q is high), so RESET turns on all of the lights.  Each push button pulses the CLOCK input of its flip-flop, which causes the flip-flop to change state if the J and K inputs are both high (true).  The logic that determines the J and K inputs of each flip-flop is shown in this table --

![JK inputs logic table](https://github.com/sigfredonin/react-app-princeps-puzzle/blob/master/JK-inputs.png "JK Inputs Table")

Despite Martin Gardner's description, the Princeps Puzzle is actually a straightforward implementation of the rules for removing a ring, constructed with diode logic and classic small scale integrated logic circuits — 7400 series TTL SSI ICs to the cognoscenti, which includes practically every engineer and hobbyist of my generation who ever built a digital logic circuit, and probably most digital engineers today as well. The transistors in the design are used to supply adequate current to the indicator lamps and play no part in the logic.

Today an engineer would most likely implement it with one of the many inexpensive microcontrollers available for under $10 quantity one, and LEDs for the lights. The Python programs given later implement the logic that one would use.  The principal design decision would be how to trade off the number of I/O pins on the microcontroller with external logic to drive the LEDs and sense the push buttons.  One circuit design that requires very few I/O pins has these minimum requirements:

* a 3-bit output port to drive an external 3-bit to 8-line decoder that selects one of the 8 LEDs and its corresponding push button;
* one output port to drive the selected LED;
* one input port to sense the selected push button;
* one input port to sense the RESET push button.

For example, the PIC16F54 is available from multiple vendors for $0.65 in single unit quantities; it has 12 I/O pins, flash memory for 512 12-bit instructions, and 25 bytes of RAM.  The PIC16F57 costs ~$1.00 for a single unit; it has flash memory for 2048 12-bit instructions, 72 bytes of RAM, and 20 I/O pins, enough to use a dedicated I/O pin for each of the 8 LEDS and 9 push buttons.

### React App

The React app has a *game* component that maintains state corresponding to the flip-flops.  Each time a button corresponding to one of the lights is pressed, the game component computes the JK inputs to each flip-flop, then computes the new state, changing the flip-flop corresponding to the pressed button if its JK inputs are *true*.

### Python Code

This Python implementation directly transcribes the circuit logic. The instance variable *q* represents the flip-flops. The variable *jk* represents the J and K inputs to the flip-flops. The function *press()* computes the result of pressing a button and pulsing the CLOCK input of a particular flip-flop. The function *reset()* computes the result of pushing the RESET button and pulsing the CLEAR input of all of the flip-flops: this returns the puzzle to its initial state with all of the flip-flops set to 0 and all of the lights on. The function *game()* resets the puzzle then computes and displays the light states resulting from a sequence of button presses.

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
Whereas the implementation above clearly mimics the circuit logic, this second implementation uses a binary representation of the lights.  This algorithm is more suitable for a very low end microcontroller, such as the PIC16F54.

The instance variable *lights* holds the state of the lights; a '1' bit represents an ON light, a '0' bit represents an OFF light.  The lights are arranged left-to-right with the leftmost light represented by the high order bit and the rightmost by the low order bit.

The method *show()* displays the state of the lights as a line of text on the console.  In a microcontroller based game, an output port would be wired to control the lights, for example, port B on a PIC16F54, and the method *show()* would write the lights state to the port.

The method *reset()* sets the lights state to all ON.

The method *press()* responds to the actuation of one of the 8 buttons asssociated with the 8 lights.
It uses method *canChange()* to determine if the lights state permits the light associated with the pressed button to change.
It uses method *mask()* to select the individual light in the state and an XOR (exclusive OR) operation to flip its state.

The method *canChange()* returns *True* if the selected light is the leftmost light (*lightIndex* is zero), or if shifting the bit representing the selected light's left neighbor into the low order position results in a b'00000001'.  The shift can only result in this value if the left neighbor of the selected light is ON and all of the lights to its left are OFF.

The method *presses()* calls *press()* for a sequence of button presses, then shows the resulting lights state.  It would not be used in a microcontroller based game.

The method *game()* resets the lights, then runs a sequence of button presses.
In a microcontroller based game, it would loop sensing button presses and calling either *reset()* or *press()* then *show()* in response.

```python
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

    def canChange(self, lightIndex):
        return (lightIndex == 0) or ((self.lights >> (8-lightIndex)) == 0b00000001)

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
