// Pump.fun Paper Sprint (6-hour forward window): a dip-buying bot with an
// absorption filter. It buys established curves that have fallen from their
// high while strangers' net buying over the lookback stays strongly
// positive, risks a small fixed stake per idea, leaves on mechanical exits
// (take-profit, stop, trailing stop, flow fade, time limit), and keeps a
// breadth floor of tiny round trips so the competition's minimum bar (a
// round trip of at least 0.01 SOL on at least 20 coins, drawdown at most
// 50%) is met early. The strategy lives in strategy.ts; the SDK shim is the
// kit's sdk/ts/makefun-bot.ts, vendored byte for byte.

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, PARAMS_6H } from './strategy.ts';

await runBot(createStrategy(PARAMS_6H));
