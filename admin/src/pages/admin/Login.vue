<template>
    <div id="login">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple">
                    <el-row>
                        <el-col >
                            <div class="grid-content bg-purple">
                                <el-form
                                        :model="ruleForm2"
                                        status-icon :rules="rules2"
                                        ref="ruleForm2" label-width="100px"
                                        :label-position="labelPosition"
                                        class="demo-ruleForm">
                                    <el-form-item label="用户名" prop="username" style="color: #fff;">
                                        <el-input  v-model="ruleForm2.username" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="password">
                                        <el-input type="password" v-model="ruleForm2.password" autocomplete="off" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
                                    </el-form-item>
                                    <el-form-item style="margin-top:10px;">
                                        <el-button type="primary" @click="submitForm('ruleForm2')" >提交</el-button>
                                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <canvas id="canvas"></canvas>
        <canvas id="canv"></canvas>
        <canvas id="c"></canvas>
    </div>

</template>
<script>
    import api from '../../api/index'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));

                } else if(value.length > 16) {
                    callback(new Error('用户名长度不超过16'));
                } else {
                    callback();
                }
            }
            return {
                ruleForm2: {
                    password: '',
                    username: '',
                },
                rules2: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    username: [
                        { validator: validateUser, trigger: 'blur' }
                    ]

                },
                labelPosition: 'top',
            };
        },
        mounted () {
            let num = Math.round(Math.random()*4) + 1      
            switch (num) {
                case 1:
                    this.animate1()
                    break
                case 2:
                    this.animate2()
                    break
                case 3:
                    this.animate3()
                    break
                case 4:
                    this.animate4()
                    break
                case 5:
                    this.animate5()
                    break
            }     
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.login(this.ruleForm2)
                            .then(res => {
                                if (res.code === 1) {
                                    this.ruleForm2.username = res.data.username
                                    this.$store.commit('LOGIN', res.data)
                                    this.$notify({
                                        title: '成功',
                                        message: res.msg,
                                        type: 'success',
                                        offset: 150
                                    });
                                    this.$router.push('/admin')
                                } else {
                                    this.$notify.error({
                                        title: '错误',
                                        message: res.msg,
                                        offset: 150
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    } else {
                        console.log('error submit!!')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            animate1 () {
                var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                w = canvas.width = window.innerWidth,
                h = canvas.height = window.innerHeight,
                    
                hue = 217,
                stars = [],
                count = 0,
                maxStars = 1400;

                // Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
                // Cache gradient
                var canvas2 = document.createElement('canvas'),
                    ctx2 = canvas2.getContext('2d');
                    canvas2.width = 100;
                    canvas2.height = 100;
                var half = canvas2.width/2,
                    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
                    gradient2.addColorStop(0.025, '#fff');
                    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
                    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
                    gradient2.addColorStop(1, 'transparent');

                    ctx2.fillStyle = gradient2;
                    ctx2.beginPath();
                    ctx2.arc(half, half, half, 0, Math.PI * 2);
                    ctx2.fill();

                // End cache

                function random(min, max) {
                    if (arguments.length < 2) {
                        max = min;
                        min = 0;
                    }
                    
                    if (min > max) {
                        var hold = max;
                        max = min;
                        min = hold;
                    }

                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                var Star = function() {

                    this.orbitRadius = random(w / 2 - 50);
                    this.radius = random(100, this.orbitRadius) / 10;
                    this.orbitX = w / 2;
                    this.orbitY = h / 2;
                    this.timePassed = random(0, maxStars);
                    this.speed = random(this.orbitRadius) / 900000;
                    this.alpha = random(2, 10) / 10;

                    count++;
                    stars[count] = this;
                }

                Star.prototype.draw = function() {
                var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius/2 + this.orbitY,
                    twinkle = random(10);

                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }

                ctx.globalAlpha = this.alpha;
                    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                    this.timePassed += this.speed;
                }

                for (var i = 0; i < maxStars; i++) {
                    new Star();
                }

                function animation() {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.globalAlpha = 0.8;
                    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
                    ctx.fillRect(0, 0, w, h)
                
                    ctx.globalCompositeOperation = 'lighter';
                    for (var i = 1, l = stars.length; i < l; i++) {
                        stars[i].draw();
                    }
                
                    window.requestAnimationFrame(animation);
                }
                animation();
            },
            animate2 () {
                document.querySelector('html').style.backgroundImage = 'radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%)'
                var num = 200;
                var w = window.innerWidth;
                var h = window.innerHeight;
                var max = 100;
                var _x = 0;
                var _y = 0;
                var _z = 150;
                var dtr = function(d) {
                return d * Math.PI / 180;
                };

                var rnd = function() {
                return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
                };
                var dist = function(p1, p2, p3) {
                return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
                };

                var cam = {
                obj: {
                    x: _x,
                    y: _y,
                    z: _z
                },
                dest: {
                    x: 0,
                    y: 0,
                    z: 1
                },
                dist: {
                    x: 0,
                    y: 0,
                    z: 200
                },
                ang: {
                    cplane: 0,
                    splane: 0,
                    ctheta: 0,
                    stheta: 0
                },
                zoom: 1,
                disp: {
                    x: w / 2,
                    y: h / 2,
                    z: 0
                },
                upd: function() {
                    cam.dist.x = cam.dest.x - cam.obj.x;
                    cam.dist.y = cam.dest.y - cam.obj.y;
                    cam.dist.z = cam.dest.z - cam.obj.z;
                    cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                    cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                    cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                    cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                }
                };

                var trans = {
                parts: {
                    sz: function(p, sz) {
                    return {
                        x: p.x * sz.x,
                        y: p.y * sz.y,
                        z: p.z * sz.z
                    };
                    },
                    rot: {
                    x: function(p, rot) {
                        return {
                        x: p.x,
                        y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                        z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
                        };
                    },
                    y: function(p, rot) {
                        return {
                        x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                        y: p.y,
                        z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
                        };
                    },
                    z: function(p, rot) {
                        return {
                        x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                        y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                        z: p.z
                        };
                    }
                    },
                    pos: function(p, pos) {
                    return {
                        x: p.x + pos.x,
                        y: p.y + pos.y,
                        z: p.z + pos.z
                    };
                    }
                },
                pov: {
                    plane: function(p) {
                    return {
                        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
                        y: p.y,
                        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
                    };
                    },
                    theta: function(p) {
                    return {
                        x: p.x,
                        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
                        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
                    };
                    },
                    set: function(p) {
                    return {
                        x: p.x - cam.obj.x,
                        y: p.y - cam.obj.y,
                        z: p.z - cam.obj.z
                    };
                    }
                },
                persp: function(p) {
                    return {
                    x: p.x * cam.dist.z / p.z * cam.zoom,
                    y: p.y * cam.dist.z / p.z * cam.zoom,
                    z: p.z * cam.zoom,
                    p: cam.dist.z / p.z
                    };
                },
                disp: function(p, disp) {
                    return {
                    x: p.x + disp.x,
                    y: -p.y + disp.y,
                    z: p.z + disp.z,
                    p: p.p
                    };
                },
                steps: function(_obj_, sz, rot, pos, disp) {
                    var _args = trans.parts.sz(_obj_, sz);
                    _args = trans.parts.rot.x(_args, rot);
                    _args = trans.parts.rot.y(_args, rot);
                    _args = trans.parts.rot.z(_args, rot);
                    _args = trans.parts.pos(_args, pos);
                    _args = trans.pov.plane(_args);
                    _args = trans.pov.theta(_args);
                    _args = trans.pov.set(_args);
                    _args = trans.persp(_args);
                    _args = trans.disp(_args, disp);
                    return _args;
                }
                };

                (function() {
                "use strict";
                var threeD = function(param) {
                    this.transIn = {};
                    this.transOut = {};
                    this.transIn.vtx = (param.vtx);
                    this.transIn.sz = (param.sz);
                    this.transIn.rot = (param.rot);
                    this.transIn.pos = (param.pos);
                };

                threeD.prototype.vupd = function() {
                    this.transOut = trans.steps(

                    this.transIn.vtx,
                    this.transIn.sz,
                    this.transIn.rot,
                    this.transIn.pos,
                    cam.disp
                    );
                };

                var Build = function() {
                    this.vel = 0.04;
                    this.lim = 360;
                    this.diff = 200;
                    this.initPos = 100;
                    this.toX = _x;
                    this.toY = _y;
                    this.go();
                };

                Build.prototype.go = function() {
                    this.canvas = document.getElementById("canv");
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                    this.$ = canv.getContext("2d");
                    this.$.globalCompositeOperation = 'source-over';
                    this.varr = [];
                    this.dist = [];
                    this.calc = [];

                    for (var i = 0, len = num; i < len; i++) {
                    this.add();
                    }

                    this.rotObj = {
                    x: 0,
                    y: 0,
                    z: 0
                    };
                    this.objSz = {
                    x: w / 5,
                    y: h / 5,
                    z: w / 5
                    };
                };

                Build.prototype.add = function() {
                    this.varr.push(new threeD({
                    vtx: {
                        x: rnd(),
                        y: rnd(),
                        z: rnd()
                    },
                    sz: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    rot: {
                        x: 20,
                        y: -20,
                        z: 0
                    },
                    pos: {
                        x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                        y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                        z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
                    }
                    }));
                    this.calc.push({
                    x: 360 * Math.random(),
                    y: 360 * Math.random(),
                    z: 360 * Math.random()
                    });
                };

                Build.prototype.upd = function() {
                    cam.obj.x += (this.toX - cam.obj.x) * 0.05;
                    cam.obj.y += (this.toY - cam.obj.y) * 0.05;
                };

                Build.prototype.draw = function() {
                    this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    cam.upd();
                    this.rotObj.x += 0.1;
                    this.rotObj.y += 0.1;
                    this.rotObj.z += 0.1;

                    for (var i = 0; i < this.varr.length; i++) {
                    for (var val in this.calc[i]) {
                        if (this.calc[i].hasOwnProperty(val)) {
                        this.calc[i][val] += this.vel;
                        if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
                        }
                    }

                    this.varr[i].transIn.pos = {
                        x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
                        y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
                        z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
                    };
                    this.varr[i].transIn.rot = this.rotObj;
                    this.varr[i].transIn.sz = this.objSz;
                    this.varr[i].vupd();
                    if (this.varr[i].transOut.p < 0) continue;
                    var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2);
                    this.$.globalCompositeOperation = 'lighter';
                    g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
                    g.addColorStop(.5, 'hsla(' + (i + 2) + ',85%, 40%,1)');
                    g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)');
                    this.$.fillStyle = g;
                    this.$.beginPath();
                    this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
                    this.$.fill();
                    this.$.closePath();
                    }
                };
                Build.prototype.anim = function() {
                    window.requestAnimationFrame = (function() {
                    return window.requestAnimationFrame ||
                        function(callback, element) {
                        window.setTimeout(callback, 1000 / 60);
                        };
                    })();
                    var anim = function() {
                    this.upd();
                    this.draw();
                    window.requestAnimationFrame(anim);
                    }.bind(this);
                    window.requestAnimationFrame(anim);
                };

                Build.prototype.run = function() {
                    this.anim();

                    window.addEventListener('mousemove', function(e) {
                    this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
                    this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
                    }.bind(this));
                    window.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
                    this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
                    }.bind(this));
                    window.addEventListener('mousedown', function(e) {
                    for (var i = 0; i < 100; i++) {
                        this.add();
                    }
                    }.bind(this));
                    window.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    for (var i = 0; i < 100; i++) {
                        this.add();
                    }
                    }.bind(this));
                };
                var app = new Build();
                app.run();
                })();
                window.addEventListener('resize', function() {
                canvas.width = w = window.innerWidth;
                canvas.height = h = window.innerHeight;
                }, false);
            },
            animate3 () {
                let c = document.querySelector('#c')
                var w = c.width = window.innerWidth,
                h = c.height = window.innerHeight,
                ctx = c.getContext('2d'),
                opts = {
                    len: 20,
                    count: 50,
                    baseTime: 10,
                    addedTime: 10,
                    dieChance: .05,
                    spawnChance: 1,
                    sparkChance: .1,
                    sparkDist: 10,
                    sparkSize: 2,
                    color: 'hsl(hue,100%,light%)',
                    baseLight: 50,
                    addedLight: 10,
                    shadowToTimePropMult: 6,
                    baseLightInputMultiplier: .01,
                    addedLightInputMultiplier: .02,
                    cx: w / 2,
                    cy: h / 2,
                    repaintAlpha: .04,
                    hueChange: .1
                },
                tick = 0,
                lines = [],
                dieX = w / 2 / opts.len,
                dieY = h / 2 / opts.len,
                baseRad = Math.PI * 2 / 6;
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, w, h);
                function loop() {
                    window.requestAnimationFrame(loop); ++tick;
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
                    ctx.fillRect(0, 0, w, h);
                    ctx.globalCompositeOperation = 'lighter';
                    if (lines.length < opts.count && Math.random() < opts.spawnChance) lines.push(new Line);
                    lines.map(function(line) {
                        line.step()
                    })
                }
                function Line() {
                    this.reset()
                }
                Line.prototype.reset = function() {
                    this.x = 0;
                    this.y = 0;
                    this.addedX = 0;
                    this.addedY = 0;
                    this.rad = 0;
                    this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
                    this.color = opts.color.replace('hue', tick * opts.hueChange);
                    this.cumulativeTime = 0;
                    this.beginPhase()
                }
                Line.prototype.beginPhase = function() {
                    this.x += this.addedX;
                    this.y += this.addedY;
                    this.time = 0;
                    this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
                    this.rad += baseRad * (Math.random() < .5 ? 1 : -1);
                    this.addedX = Math.cos(this.rad);
                    this.addedY = Math.sin(this.rad);
                    if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) this.reset()
                }
                Line.prototype.step = function() {++this.time; ++this.cumulativeTime;
                    if (this.time >= this.targetTime) this.beginPhase();
                    var prop = this.time / this.targetTime,
                    wave = Math.sin(prop * Math.PI / 2),
                    x = this.addedX * wave,
                    y = this.addedY * wave;
                    ctx.shadowBlur = prop * opts.shadowToTimePropMult;
                    ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier));
                    ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2);
                    if (Math.random() < opts.sparkChance) ctx.fillRect(opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize)
                }
                loop();
                window.addEventListener('resize',
                function() {
                    w = c.width = window.innerWidth;
                    h = c.height = window.innerHeight;
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, w, h);
                    opts.cx = w / 2;
                    opts.cy = h / 2;
                    dieX = w / 2 / opts.len;
                    dieY = h / 2 / opts.len
                });
            },
            animate4 () {
                var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                w = canvas.width = window.innerWidth,
                h = canvas.height = window.innerHeight,

                hue = 217,
                stars = [],
                count = 0,
                maxStars = 1200;

                var canvas2 = document.createElement('canvas'),
                ctx2 = canvas2.getContext('2d');
                canvas2.width = 100;
                canvas2.height = 100;
                var half = canvas2.width / 2,
                gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
                gradient2.addColorStop(0.025, '#fff');
                gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
                gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
                gradient2.addColorStop(1, 'transparent');

                ctx2.fillStyle = gradient2;
                ctx2.beginPath();
                ctx2.arc(half, half, half, 0, Math.PI * 2);
                ctx2.fill();

                // End cache

                function random(min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }

                if (min > max) {
                    var hold = max;
                    max = min;
                    min = hold;
                }

                return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                function maxOrbit(x, y) {
                var max = Math.max(x, y),
                    diameter = Math.round(Math.sqrt(max * max + max * max));
                return diameter / 2;
                }

                var Star = function() {

                this.orbitRadius = random(maxOrbit(w, h));
                this.radius = random(60, this.orbitRadius) / 12;
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / 900000;
                this.alpha = random(2, 10) / 10;

                count++;
                stars[count] = this;
                }

                Star.prototype.draw = function() {
                var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                    twinkle = random(10);

                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }

                ctx.globalAlpha = this.alpha;
                ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                this.timePassed += this.speed;
                }

                for (var i = 0; i < maxStars; i++) {
                new Star();
                }

                function animation() {
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
                ctx.fillRect(0, 0, w, h)

                ctx.globalCompositeOperation = 'lighter';
                for (var i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                };

                window.requestAnimationFrame(animation);
                }

                animation();
            },
            animate5 () {
                document.querySelector('html').style.backgroundColor = '#000'
                var canvas,
                    ctx,
                    width,
                    height,
                    size,
                    lines,
                    tick;

                function line() {
                    this.path = [];
                    this.speed = rand(10, 20);
                    this.count = randInt(10, 30);
                    this.x = width / 2, +1;
                    this.y = height / 2 + 1;
                    this.target = {
                        x: width / 2,
                        y: height / 2
                    };
                    this.dist = 0;
                    this.angle = 0;
                    this.hue = tick / 5;
                    this.life = 1;
                    this.updateAngle();
                    this.updateDist();
                }

                line.prototype.step = function(i) {
                    this.x += Math.cos(this.angle) * this.speed;
                    this.y += Math.sin(this.angle) * this.speed;

                    this.updateDist();

                    if (this.dist < this.speed) {
                        this.x = this.target.x;
                        this.y = this.target.y;
                        this.changeTarget();
                    }

                    this.path.push({
                        x: this.x,
                        y: this.y
                    });
                    if (this.path.length > this.count) {
                        this.path.shift();
                    }

                    this.life -= 0.001;

                    if (this.life <= 0) {
                        this.path = null;
                        lines.splice(i, 1);
                    }
                };

                line.prototype.updateDist = function() {
                    var dx = this.target.x - this.x,
                        dy = this.target.y - this.y;
                    this.dist = Math.sqrt(dx * dx + dy * dy);
                }

                line.prototype.updateAngle = function() {
                    var dx = this.target.x - this.x,
                        dy = this.target.y - this.y;
                    this.angle = Math.atan2(dy, dx);
                }

                line.prototype.changeTarget = function() {
                    var randStart = randInt(0, 3);
                    switch (randStart) {
                        case 0: // up
                            this.target.y = this.y - size;
                            break;
                        case 1: // right
                            this.target.x = this.x + size;
                            break;
                        case 2: // down
                            this.target.y = this.y + size;
                            break;
                        case 3: // left
                            this.target.x = this.x - size;
                    }
                    this.updateAngle();
                };

                line.prototype.draw = function(i) {
                    ctx.beginPath();
                    var rando = rand(0, 10);
                    for (var j = 0, length = this.path.length; j < length; j++) {
                        ctx[(j === 0) ? 'moveTo' : 'lineTo'](this.path[j].x + rand(-rando, rando), this.path[j].y + rand(-rando, rando));
                    }
                    ctx.strokeStyle = 'hsla(' + rand(this.hue, this.hue + 30) + ', 80%, 55%, ' + (this.life / 3) + ')';
                    ctx.lineWidth = rand(0.1, 2);
                    ctx.stroke();
                };

                function rand(min, max) {
                    return Math.random() * (max - min) + min;
                }

                function randInt(min, max) {
                    return Math.floor(min + Math.random() * (max - min + 1));
                };

                function init() {
                    canvas = document.getElementById('canvas');
                    ctx = canvas.getContext('2d');
                    size = 30;
                    lines = [];
                    reset();
                    loop();
                }

                function reset() {
                    width = Math.ceil(window.innerWidth / 2) * 2;
                    height = Math.ceil(window.innerHeight / 2) * 2;
                    tick = 0;

                    lines.length = 0;
                    canvas.width = width;
                    canvas.height = height;
                }

                function create() {
                    if (tick % 10 === 0) {
                        lines.push(new line());
                    }
                }

                function step() {
                    var i = lines.length;
                    while (i--) {
                        lines[i].step(i);
                    }
                }

                function clear() {
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1';
                    ctx.fillRect(0, 0, width, height);
                    ctx.globalCompositeOperation = 'lighter';
                }

                function draw() {
                    ctx.save();
                    ctx.translate(width / 2, height / 2);
                    ctx.rotate(tick * 0.001);
                    var scale = 0.8 + Math.cos(tick * 0.02) * 0.2;
                    ctx.scale(scale, scale);
                    ctx.translate(-width / 2, -height / 2);
                    var i = lines.length;
                    while (i--) {
                        lines[i].draw(i);
                    }
                    ctx.restore();
                }

                function loop() {
                    requestAnimationFrame(loop);
                    create();
                    step();
                    clear();
                    draw();
                    tick++;
                }

                function onresize() {
                    reset();
                }

                window.addEventListener('resize', onresize);

                init();
            },
            loginGithub () {
                this.$store.dispatch('loginGithub')
            }
        },
        beforeRouteLeave (to, from, next) {
            document.querySelector('html').style.backgroundImage = ''
            next()
        },
    }
</script>
<style scoped lang="less">
    #login {
        margin-top: 180px;
    }
    #canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -11111;
    }
    #c {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -11111; 
    }
    #canv {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -11111;  
    }
    .login-github {
        svg {
            font-size: 30px;
            color: #fff;
        }

    }

</style>