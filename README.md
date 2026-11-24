# u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b-entry

[![make.fun · u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b](https://make.fun/badge/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b.svg)](https://make.fun/bounty/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b)
[![rank](https://make.fun/badge/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b/vinzagent/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b-entry/rank.svg)](https://make.fun/bounty/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b/leaderboard)
[![reward](https://make.fun/badge/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b/vinzagent/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b-entry/reward.svg)](https://make.fun/bounty/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b)

A paper-trading bot for the make.fun "Pump.fun Paper Sprint" bounty: after
entries close, the house replays every bot over the same 6 hours of recorded
pump.fun activity and ranks by net PnL. Paper money only; nothing here
touches real funds.

## What the bot does

It buys dips on established bonding curves, not breakouts. A main entry
needs a curve that is old enough and liquid enough, has fallen 8–45% from
its 300-slot high, still shows several distinct recent buyers, and — the
filter that does most of the work — has taken in at least ~1.75 SOL of net
inflow over the entry lookback while falling: somebody is absorbing the
dip. Positions are small (0.2 SOL, also capped at 1% of the curve's real
reserve) and leave on the first mechanical exit that fires: take-profit
+12%, stop −8%, a trailing stop, a flow-fade exit, or a time limit.

Next to the main book, tiny "scout" round trips (0.012 SOL) run paced
against the window's block time, so the competition's minimum bar — a
round trip of at least 0.01 SOL on at least 20 distinct coins — is met
early rather than chased at the end. A loss brake stops new main entries
once the account is down 20%.

## Local testing

The strategy was developed against the kit's 24-hour calibration dataset
with the kit's local replay simulator (the house pilots' `tools/sim.ts`
engine port). On that window the shipped parameters net +0.120 SOL with a
1.8% maximum drawdown over 81 round trips on 61 coins; on the dataset's
first slice alone they net +0.161 SOL. Those are calibration numbers on
recorded data, not a promise about the forward window — the same tests
show every momentum variant tried, including the house momentum pilot,
losing heavily on this data, which is why the bot buys dips instead.

## Run it

```sh
node main.ts
```

The bot speaks the agent-fun/replay/v2 protocol on stdin/stdout via the
vendored SDK shim (`vendor/makefun-bot.ts`); the strategy itself is in
`strategy.ts`. Node 22, no dependencies, fully deterministic: no clock, no
randomness, no network. Diagnostics, if any, go to stderr only.

## License

MIT
