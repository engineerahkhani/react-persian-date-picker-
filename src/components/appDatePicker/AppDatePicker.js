import React, {Component} from "react";

import "./date.css";


class AppDatePicker extends Component {
    t = new Date();
    state = {
        level: 1,
        open: false,
        toDay: this.g2j(this.t.getFullYear(), this.t.getMonth() + 1, this.t.getDate()),
        jToday: "",
        show: "",
        month: this.g2j(this.t.getFullYear(), this.t.getMonth() + 1, this.t.getDate())[1],
        year: this.g2j(this.t.getFullYear(), this.t.getMonth() + 1, this.t.getDate())[0]
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.initial) {
            this.initial(nextProps.initial);
        }
    }

    initial = (initial) => {
        let res = initial.split("-"), toDay, month, year;
        res[2] = res[2].split(" ")[0];
        toDay = this.g2j(parseInt(res[0]), parseInt(res[1]), parseInt(res[2]));
        month = this.g2j(parseInt(res[0]), parseInt(res[1]), parseInt(res[2]))[1];
        year = this.g2j(parseInt(res[0]), parseInt(res[1]), parseInt(res[2]))[0];
        this.setState({toDay, year, month});
        this.handleSelectDay(toDay, false);
    };

    handleCalendar = () => {
        if (!this.state.open) {
            this.setState({show: ""});
        }
    };

    monthDays = (year, month) => {
        let x = 0, i;
        if (month < 7) {
            x = 31;
        } else if (month < 12) {
            x = 30;
        } else if (month === 12) {
            for (i = 0; i < 6; i++) {
                if (x < this.g2j(this.j2g(year, 11, 5)[0], 3, i + 18)[2]) {
                    x = this.g2j(this.j2g(year, 11, 5)[0], 3, i + 18)[2];
                }
            }
        }
        return x;
    };

    handleMonth = (x) => {
        let {month, year} = this.state;
        switch (this.state.level) {
            case 1:
                if (month + x < 1 && year > 980) {
                    month = 12;
                    year--;
                    this.setState({month, year});
                } else if (month + x > 12 && year < 1699) {
                    month = 1;
                    year++;
                    this.setState({month, year});
                } else if (month + x > 0 && month + x < 13) {
                    month += x;
                    this.setState({month});
                }
                break;
            case 2:
                year += x;
                if (year < 980) {
                    year = 980;
                } else if (year > 1699) {
                    year = 1699;
                }
                this.setState({year});
        }
        this.textInput.focus();
    };

    handleSelectYear = () => {
        let {year} = this.state;
        if (year < 980) {
            year = 980;
        } else if (year > 1699) {
            year = 1699;
        }
        this.setState({year});
    };

    handleSelectMonth = (a) => {
        this.setState({level: 1, month: a});
        this.textInput.focus();
    };

    handleSelectDay = (a, initial = true) => {
        this.setState({level: 1});
        let gToday = "", g = this.j2g(a[0], a[1], a[2]),
            jToday = this.week((new Date(this.j2g(a[0], a[1], a[2])).getDay() + 1) % 7) + ` ${a[2]} ` + this.month(a[1]) + ` ${a[0]} `;
        this.setState({toDay: a, month: a[1], year: a[0]});
        g.forEach((b, k) => k === 0 ? gToday += `${b}` : gToday += `-${b}`);
        gToday += " 00:00:00";
        this.setState({jToday});
        if (initial) {
            this.props.onChange(gToday, this.props.id);
            this.textInput.focus();
        }
    };

    handleYear = () => {
        this.state.level < 2 && this.setState({level: this.state.level + 1});
    };

    week(a) {
        switch (a) {
            case 0:
                return "شنبه";
                break;
            case 1:
                return "یکشنبه";
                break;
            case 2:
                return "دوشنبه";
                break;
            case 3:
                return "سه شنبه";
                break;
            case 4:
                return "چهارشنبه";
                break;
            case 5:
                return "پنج شنبه";
                break;
            case 6:
                return "جمعه";
                break;
        }
    }

    month(a) {
        switch (a) {
            case 1:
                return "فروردین";
                break;
            case 2:
                return "اردیبهشت";
                break;
            case 3:
                return "خرداد";
                break;
            case 4:
                return "تیر";
                break;
            case 5:
                return "مرداد";
                break;
            case 6:
                return "شهریور";
                break;
            case 7:
                return "مهر";
                break;
            case 8:
                return "آبان";
                break;
            case 9:
                return "آذر";
                break;
            case 10:
                return "دی";
                break;
            case 11:
                return "بهمن";
                break;
            case 12:
                return "اسفند";
                break;
        }
    }

    g2j(gy, gm, gd) {
        let jy, gy2, days, jm, jd, g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        if (gy > 1600) {
            jy = 979;
            gy -= 1600;
        } else {
            jy = 0;
            gy -= 621;
        }
        gy2 = (gm > 2) ? (gy + 1) : gy;
        days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
        jy += 33 * (parseInt(days / 12053));
        days %= 12053;
        jy += 4 * (parseInt(days / 1461));
        days %= 1461;
        if (days > 365) {
            jy += parseInt((days - 1) / 365);
            days = (days - 1) % 365;
        }
        jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
        jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return [jy, jm, jd];
    }

    j2g(jy, jm, jd) {
        let gy, days, gd, sal_a, gm, v;
        if (jy > 979) {
            gy = 1600;
            jy -= 979;
        } else {
            gy = 621;
        }
        days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4)) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
        gy += 400 * (parseInt(days / 146097));
        days %= 146097;
        if (days > 36524) {
            gy += 100 * (parseInt(--days / 36524));
            days %= 36524;
            if (days >= 365) days++;
        }
        gy += 4 * (parseInt(days / 1461));
        days %= 1461;
        if (days > 365) {
            gy += parseInt((days - 1) / 365);
            days = (days - 1) % 365;
        }
        gd = days + 1;
        sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (gm = 0; gm < 13; gm++) {
            v = sal_a[gm];
            if (gd <= v) break;
            gd -= v;
        }
        return [gy, gm, gd];
    }

    weekCreator(year, month) {
        let a = [],
            firstDay = (new Date(this.j2g(year, month, 1)).getDay() + 1) % 7,
            i, j = -1,
            last = this.monthDays(year, month),
            lastDay = 6 - ((new Date(this.j2g(year, month, last)).getDay() + 1) % 7);
        for (i = 0; i < last + firstDay + lastDay; i++) {
            if (i % 7 === 0) {
                a.push([]);
                j++;
            }
            if (i < firstDay) {
                a[j].push("");
            } else if (i < firstDay + last) {
                a[j].push(i - firstDay + 1);
            } else if (i < last + firstDay + lastDay) {
                a[j].push("");
            }
        }
        return a;
    }

    period = (name, date) => {
        let res = date.split("-"), x = [];
        res[2] = res[2].split(" ")[0];
        res.forEach(a => {
            x.push(parseInt(a));
        });
        res = this.g2j(x[0], x[1], x[2]);
        this.setState({[name]: res});
    };

    componentWillMount() {
        if (this.props.min) {
            this.period("min", this.props.min);
        }
        if (this.props.max) {
            this.period("max", this.props.max);
        }
    }

    render() {
        const m = [["فروردین", "اردیبهشت", "خرداد"],
            ["تیر", "مرداد", "شهریور"],
            ["مهر", "آبان", "آذر"],
            ["دی", "بهمن", "اسفند"]];

        return (
            <div
                className="input-calendar"
                onMouseEnter={() => this.setState({open: true})}
                onMouseLeave={() => this.setState({open: false})}
            >
                <input
                    placeholder="انتخاب کنید"
                    onFocus={() => this.setState({show: " show"})}
                    onBlur={this.handleCalendar}
                    value={this.state.jToday}
                    readOnly
                    ref={(input) => {
                        this.textInput = input;
                    }}
                />
                <div className={`calendar-box${this.state.show}`}>
                    <div className="calendar-box-title">
                        <div
                            className="click"
                            onClick={() => this.handleMonth(-1)}
                        >
                            <div>-</div>
                        </div>
                        <div
                            className="click text-month"
                            onClick={this.handleYear}
                        >
                            {(() => {
                                switch (this.state.level) {
                                    case 1:
                                        return (
                                            <div className="middle-text">
                                                <span>
                                                    {this.month(this.state.month)}
                                                </span>
                                                <span>
                                                    {this.state.year}
                                                </span>
                                            </div>);
                                        break;
                                    case 2:
                                        return (<input
                                            type="number"
                                            id="year-input"
                                            value={this.state.year}
                                            onChange={e => this.setState({year: parseInt(e.target.value)})}
                                            onBlur={this.handleSelectYear}
                                        />);
                                        break;
                                }
                            })()}
                        </div>
                        <div
                            className="click"
                            onClick={() => this.handleMonth(1)}
                        >
                            <div>-</div>
                        </div>
                    </div>
                    {(() => {
                        switch (this.state.level) {
                            case 1:
                                return (
                                    <table className="calendar-table">
                                        <thead>
                                        <tr>
                                            <th>ش</th>
                                            <th>ی</th>
                                            <th>د</th>
                                            <th>س</th>
                                            <th>چ</th>
                                            <th>پ</th>
                                            <th>ج</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.weekCreator(this.state.year, this.state.month).map((a, k) =>
                                            (<tr key={k}>
                                                {a.map((b, x) =>
                                                    (<td
                                                        key={x * 100}
                                                        negative={x % 12 === 6}
                                                        className={`${(b === "" || ((this.state.year > this.state.max[0] || this.state.year < this.state.min[0]) || ((this.state.year === this.state.max[0] && this.state.month > this.state.max[1]) || (this.state.year === this.state.min[0] && this.state.month < this.state.min[1])) || ((this.state.year === this.state.max[0] && this.state.month === this.state.max[1] && b > this.state.max[2]) || (this.state.year === this.state.min[0] && this.state.month === this.state.min[1] && b < this.state.min[2])))) && " disable-day"}
																			${(this.state.toDay[0] === this.state.year && this.state.toDay[1] === this.state.month && this.state.toDay[2] === b) && " to-day"}`}
                                                        onClick={() => this.handleSelectDay([this.state.year, this.state.month, b])}
                                                    >
                                                        {b}
                                                    </td>)
                                                )}
                                            </tr>)
                                        )}
                                        </tbody>
                                    </table>);
                                break;
                            case 2:
                                return (<table celled className="calendar-table">
                                    <tbody>
                                    {m.map((a, k) =>
                                        (<tr key={k}>
                                            {a.map((b, x) =>
                                                (<td
                                                    key={x * 100}
                                                    className={`${(this.state.toDay[0] === this.state.year && this.state.toDay[1] === ((a.length * k) + (x + 1))) && " to-day"}`}
                                                    onClick={() => this.handleSelectMonth((a.length * k) + (x + 1))}
                                                >
                                                    {b}
                                                </td>)
                                            )}
                                        </tr>)
                                    )}
                                    </tbody>
                                </table>);
                        }
                    })()}
                    <button
                        className="to-day-select"
                        onClick={() => this.handleSelectDay(this.g2j(this.t.getFullYear(), this.t.getMonth() + 1, this.t.getDate()))}
                    >
                        امروز
                    </button>
                </div>
            </div>
        );
    }
}


export default AppDatePicker;
