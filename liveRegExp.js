(function(window, undefined) {
    var liveRegExp = function(pattern, flags) {
            var reg, steps, rsteps;
            if (pattern.source === undefined) {
                reg = new RegExp(pattern, flags);
                flags = getFlags(reg);
            } else {
                reg = pattern;
                flags = getFlags(reg);
            }
            steps = getSteps(reg);
            rsteps = [];
            for (var i = 0; i < steps.length; i++) {
                rsteps.push(new RegExp(steps[i], flags));
            }
            this.original = reg;
            this.sourceSteps = steps;
            this.steps = rsteps;
            this.first = rsteps[0];
            this.last = rsteps[rsteps.length - 1];
            this.length = rsteps.length;
            this.source = reg.source;
            this.flags = flags;
            this.haveSameFlagsAs = function(reg) {
                if (reg.flags) {
                    return this.flags === reg.flags;
                } else {
                    return this.flags === getFlags(reg);
                }
            }
            this.global = reg.global;
            this.ignoreCase = reg.ignoreCase;
            this.multiline = reg.multiline;
            this.sticky = !!reg.sticky;
            this.unicode = !!reg.unicode;
            this.match = function(str, full) {
                var steps = [],
                    found = [];

                str = str.toString();
                for (var i = this.length - 1, n, p; i >= 0; i--) {
                    n = this.steps[i];
                    n.lastIndex = 0;
                    p = n.exec(str);
                    if (p) {
                        do {
                            if ((!this.global && !full) || !hasAlreadyBeenFound(p.index, found)) {
                                steps.push({
                                    stepIndex: i,
                                    rate: (i + 1) / this.length,
                                    data: p[0],
                                    index: p.index
                                });
                                found.push(p.index, p.index + p[0].length - 1);
                                if ((!this.global && !full) || (!full && full !== undefined)) {
                                    i = -1;
                                    break;
                                }
                            }
                        } while (this.global && (p = n.exec(str)));
                    }
                }
                if (steps.length < 1) {
                    return null;
                }
                steps = steps.sort(function(a, b) {
                    return a.index - b.index;
                });
                return steps;
            }
        },
        hasAlreadyBeenFound = function(index, found) {
            for (var i = 0, l = found.length; i < l; i = i + 2) {
                if (index >= found[i] && index <= found[i + 1]) {
                    return true;
                }
            }
            return false;
        },
        getFlags = function(reg) {
            return (reg.global ? "g" : "") + (reg.ignoreCase ? "i" : "") + (reg.multiline ? "m" : "") + (reg.sticky ? "y" : "") + (reg.unicode ? "u" : "");
        },
        getParentheseIndex = function(reg, index, m) {
            m = m || 0;
            for (var i = index, l = reg.length, p = 0, n; i < l; i++) {
                n = reg.charAt(i);
                if (n == "(") {
                    p++;
                    continue;
                } else if (n == ")") {
                    p--;
                    if (p <= 0) {
                        return i;
                    }
                }
            }
            return reg.length - m;
        },
	reg_block = /\((?:\?[:=!]|)\)/,
	reg_escape = /\\./g,
	reg_pipe = /\|/g,
	reg_parenthese = /(\(\?:|\(\?=|\(\?!|\()/,
	reg_aft = /^((\*\?)|(\+\?)|\*|\+|\?)/,
	reg_aft2 = /^\{([0-9]+)(,?[0-9]*\})/,
	reg_aft3 = /^\{([0-9]+)(,[0-9]*)\}/,
	reg_nb = /^\{([0-9]+)\}/,
        getSteps = function getSteps(reg) {
            var reg = reg.source;
	    if(reg_block.test(reg)){
		return [];
	    }
            var safereg = reg.replace(reg_escape, String.fromCharCode(9000) + String.fromCharCode(9000)),
                steps = [],
                actualStep = "",
                char = "",
                substeps,
                laststep,
                addStep = function(step) {
                    if (steps.length == 0) {
                        steps.push(step);
                    } else {
                        steps.push(steps[steps.length - 1] + "" + step);
                    }
                };
            if (safereg.indexOf("|") >= 0) {
                var orreg = "";
                for (var i = 0, l = safereg.length, n; i < l; i++) {
                    n = safereg.charAt(i);
                    if (n != "(") {
                        orreg += n;
                        continue;
                    } else {
                        var n2 = getParentheseIndex(safereg, i);
                        orreg += safereg.substring(i, n2 + 1).replace(reg_pipe, String.fromCharCode(9000));
                        i += n2 - i;
                    }

                }
                if (orreg.indexOf("|") >= 0) {
                    var torreg = orreg.split(reg_pipe),
                        p,
                        substeps = [],
                        k = 0;
                    for (var i = 0, l = torreg.length; i < l; i++) {
                        p = reg.substring(k, k + torreg[i].length);
                        k += torreg[i].length + 1;
                        substeps.push(getSteps(new RegExp(p)));
                    }
                    var lengths = [];
                    for (var i = 0; i < substeps.length; i++) {
                        lengths.push(substeps[i].length);
                    }
                    for (var i = 0, actualStep2, l = Math.max.apply(Math, lengths); i < l; i++) {
                        actualStep2 = actualStep;
                        for (var j = 0; j < substeps.length; j++) {
                            actualStep2 += substeps[j][Math.min(i, substeps[j].length - 1)] + "|";
                        }
                        steps.push(actualStep2.substring(0, actualStep2.length - 1));
                    }
                    actualStep = "";
                    return steps;
                }
            }
            for (var i = 0, n, l = reg.length; i < l; i++) {
                n = reg.charAt(i);
                char = "";
                if (n == "^" || n == "$") {
                    actualStep += n;
                    continue;
                } else if (n == "(") {

                    // Let's the horror begins !
                    var n2 = getParentheseIndex(safereg, i),
                        type = reg_parenthese.exec(reg.substring(i));
                    if (!type) {
                        throw ("Error parsing : /" + reg + "/");
                    }
                    if (type[1] == "(?!") {
                        addStep(reg.substring(i, n2 + 1));
                    } else {
                        p = reg.substring(i + type[1].length, n2);
                        substeps = getSteps(new RegExp(p));
                        var after = "",
                            afterstr = reg.substring(n2 + 1),
                            afterreg = reg_aft.exec(afterstr),
                            d = 0,
                            afterafter = "";
                        if (afterstr) {
                            if (afterreg) {
                                after = afterreg[1];
                            }
                            afterreg = reg_aft2.exec(afterstr);
                            if (afterreg) {
                                d = parseInt(afterreg[1]);
                                afterafter = afterreg[2];
                                if (d === 0) {
                                    after = "{0" + afterafter;
                                } else {
                                    after = "{1" + afterafter;
                                }
                            }
                        }
                        if (steps.length > 0) {
                            laststep = steps[steps.length - 1];
                        } else {
                            laststep = "";
                        }
                        for (var j = 0, l2 = substeps.length; j < l2; j++) {
                            if (j + 1 >= l2 && d > 1) {
                                for (var k = 1; k <= d; k++) {
                                    steps.push(laststep + actualStep + type[1] + substeps[j] + "){" + k + afterafter);
                                }
                                after = "{" + d + afterafter;
                            } else {
                                steps.push(laststep + actualStep + type[1] + substeps[j] + ")" + after);
                            }
                        }

                    }
                    actualStep = "";
                    i += (n2 - i) + (after || "").length;
                    continue;

                } else if (n == "[") {
                    char = reg.substring(i, safereg.indexOf(']', i) + 1);
                } else if (n == "\\") {
                    var n2 = reg.charAt(i + 1);
                    if (n2 == "u" || n2 == "U") {
                        char = n + reg.substring(i + 1, i + 6);
                    } else if (n2 == "c" || n2 == "C") {
                        char = n + n2 + reg.charAt(i + 2);
                    } else if (n2 == "x" || n2 == "X") {
                        char = n + reg.substring(i + 1, i + 4);
                    } else {
                        char = n + reg.charAt(i + 1);
                    }
                } else {
                    char = n;
                }
                if (char) {
                    var nstr = reg.substring(i + char.length);
                    var p = reg_aft.exec(nstr);
                    if (p) {
                        char = char + p[0];
                        i += char.length - 1;
                        addStep(actualStep + "" + char);
                        actualStep = "";
                        continue;
                    }
                    p = reg_nb.exec(nstr);
                    if (p) {
                        var laststep = steps[steps.length - 1] || "",
                            d = parseInt(p[1]);
                        i += (char + p[0]).length - 1;
                        if (d === 0) {
                            addStep(actualStep + char + p[0])
                        } else {
                            for (var j = 1; j <= d; j++) {
                                steps.push(laststep + actualStep + char + "{" + j + "}");
                            }
                        }
                        actualStep = "";
                        continue;
                    }
                    p = reg_aft3.exec(nstr);
                    if (p) {
                        var laststep = steps[steps.length - 1] || "",
                            d = parseInt(p[1]);
                        i += (char + p[0]).length - 1;
                        if (d === 0) {
                            addStep(actualStep + char + p[0])
                        } else {
                            for (var j = 1; j <= d; j++) {
                                steps.push(laststep + actualStep + char + "{" + j + p[2] + "}");
                            }
                        }
                        actualStep = "";
                        continue;
                    } else {
                        i += char.length - 1;
                        addStep(actualStep + "" + char);
                        actualStep = "";
                        continue;
                    }

                }
            }
            if (actualStep) {
                addStep(actualStep);
            }
            return steps;
        }
    window.liveRegExp = function(pattern, flags) {
        return new liveRegExp(pattern, flags);
    }
    window.liveRegExp.version = "0.9a2";
    window.liveRegExp.supportSticky = (function() {
        try {
            return !!(new RegExp("", "y").sticky);
        } catch (e) {
            return false;
        }
    })();
    window.liveRegExp.supportUnicode = (function() {
        try {
            return !!(new RegExp("", "u").unicode);
        } catch (e) {
            return false;
        }
    })();
    window.liveRegExp.createFlags = function(global, icase, multi, sticky, unicode, others) {
        return (global ? "g" : "") + (icase ? "i" : "") + (multi ? "m" : "") + (sticky ? "y" : "") + (unicode ? "u" : "") + (others || "");
    }
})(this);