/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Fraction(fr) {
                this.int = 0;
                this.numerator = parseFraction(fr, 'num');
                this.denomerator = parseFraction(fr, 'denom');
 
                this.toString = function () {
                    return this.numerator + '/' + this.denomerator;
                };
 
                this.normalize = function () {
                    if (this.numerator % this.denomerator === 0) {
                        this.toString = function () {
                            return this.numerator / this.denomerator;
                        }
                    }
                    else {
                        if(this.numerator<0){
                            var min_gd = minGeneralDivider(this.numerator*(-1), this.denomerator);
                            
                            this.toString = function () {
                                return (this.numerator*(-1) / min_gd) + '/' + (this.denomerator / min_gd);
                            };
                        }else
                            var min_gd = minGeneralDivider(this.numerator, this.denomerator);
                        this.toString = function () {
                            return (this.numerator / min_gd) + '/' + (this.denomerator / min_gd);
                        };
                    }
                }
 
                this.add = function (fr2) {
                    var tdenom = fr2.denomerator * this.denomerator,
                        tnum = this.numerator * fr2.denomerator + this.denomerator * fr2.numerator,
                        result = new Fraction(tnum + '/' + tdenom);
 
                    result.normalize();
 
                    return result;
                }
 
                this.substraction = function (fr2) {
                    var tdenom = fr2.denomerator * this.denomerator,
                        tnum = this.numerator * fr2.denomerator - this.denomerator * fr2.numerator,
                        result = new Fraction(tnum + '/' + tdenom);
 
                    result.normalize();
 
                    return result;
                }
 
                this.multiply = function (fr2) {
                    var tdenom = fr2.denomerator * this.denomerator,
                        tnum = this.numerator * fr2.numerator,
                        result = new Fraction(tnum + '/' + tdenom);
 
                    result.normalize();
 
                    return result;
                }
 
                this.division = function (fr2) {
                    var tdenom = this.denomerator * fr2.numerator,
                        tnum = this.numerator * fr2.denomerator,
                        result = new Fraction(tnum + '/' + tdenom);
 
                    result.normalize();
 
                    return result;
                }
 
                function parseFraction(str, value) {
                    var arr = str.split('/');
                    return value === 'num' ? arr[0] : arr[1];
                }
 
                //алгоритм Эвклида
                function minGeneralDivider(a, b) {
                    var res = 0;
                    var maxtmp,mintmp;
                    maxtmp=Math.max(a, b);
                    mintmp=Math.min(a, b);
                    if (maxtmp % mintmp === 0) {
                        return mintmp;
                    }
                    else {
                        return minGeneralDivider((maxtmp % mintmp), mintmp);
                    }
                }
            };            
 
            function checkValues(fr1,fr2) {
                var checkExp = /[0-9]+\/[1-9]+/;
 
                if ((fr1 === '') && (fr2 === '')) {
                    return false;
                }
                else {
                    if (fr1.search(checkExp) === -1 && fr2.search(checkExp) === -1) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }            
 
            function calculateOUR(fr1,fr2,operation) {
                if (checkValues(fr1,fr2)) {
                     fr1 = new Fraction(fr1);
                        fr2 = new Fraction(fr2);
                    switch (operation){
                        case '+':
                            return fr1.add(fr2);
                            break;
                        case '-':
                            return fr1.substraction(fr2);
                            break;
                        case '*':
                            return fr1.multiply(fr2);
                            break;
                        case '/':
                            return fr1.division(fr2);
                            break;
                    }
                }
                else {
                    alert('Write correct fractions!');
                }
            };