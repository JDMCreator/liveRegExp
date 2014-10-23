liveRegExp.js
=============

__Version 0.9 ALPHA 2__

liveRegExp.js allows your RegExp to partially match string, using step-RegExps.

## How to use :


```js
var reg = liveRegExp("a(b|cd)e", "gi"),
result = reg.match("abace");
```

or

```js
var reg = liveRegExp(/a(b|cd)e/gi),
result = reg.match("abace");
```

The argument must be a valid RegExp.

## API

###liveRegExp Object Properties


**first** : ```RegExp```. Return the first generated step-RegExp.

**flags** : ```String```. A lowercase String of all flags. Ex : ```gi```.

**global** : ```Boolean```. Is the ```g``` flag present.

**ignoreCase** : ```Boolean```. Is the ```i``` flag present.

**last** : ```RegExp```. The last and final generated step-RegExp.

**length** : ```Number```. The number of step-RegExps

**multiline** : ```Boolean```. Is the ```m``` flag present.

**original** : ```RegExp```. The original RegExp.

**source** : ```String```. The last RegExp's source.

**sourceSteps** : ```Array```. An Array of the step-RegExps' sources (It's an Array of Strings)

**steps** : ```steps```. An array of all the step-RegExps

**sticky** : ```Boolean```. Is the ```y``` flag present and supported.

**unicode** : ```Boolean```. Is the ```u``` flag present and supported.


### liveRegExp Object Methods



**haveSameFlagsAs** :

```js
Boolean livereg.haveSameFlagsAs(RegExp reg)
```

Whether livereg and the ```RegExp``` reg have the same flags

```js
Boolean livereg.haveSameFlagsAs(liveRegExp reg)
```

Whether livereg and the ```liveRegExp``` reg have the same flags

**match** :

```js
Array livereg.match(String str)
```

Return an ```Array``` of ```PartialMatch Object``` sorted by index. Return ```null``` if there're no results.


### PartialMatch Object Properties


**data** : ```String```. The data that was partially (or fully) matched)

**index** : ```Number```. The index of the match, starting at 0.

**rate** : ```Number```. The percentage of steps that was accomplished.

**stepIndex** : ```Number```. The index of the step that matched the result.


## What is a step-RegExp ?



liveRegExp.js generates step-regExps by breaking the original RegExp into each of its component. For example, the n^th RegExp = n^th-1 RegExp + its next component.

Example : Here are the step-regExps of a RegExp.

Original : 
```js
/^ab(c|de)f[g-h]+$/gi
```
Its step-RegExps :
```
0: /^a/gi
1: /^ab/gi
2: /^ab(c|d)/gi
3: /^ab(c|de)/gi
4: /^ab(c|de)f/gi
5: /^ab(c|de)f[g-h]+/gi
6: /^ab(c|de)f[g-h]+$/gi
```

## Example


Here is a [quick and dirty example](http://jdmcreator.byethost5.com/liveRegExp/example.html).

## License

All code is released under the terms of the [MIT License](http://mit-license.org/).

