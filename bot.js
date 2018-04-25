var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');
var localStorage = require('localStorage')
var schedule = require('node-schedule');
const zeroHash = '0.00 KSol/s';
const refreshIntervalTime = 60 * 1000;
var zelhashCloudPoolsV2 = zeroHash;
var zelhashCoinBlockers = zeroHash;
var zelhashEquiPool = zeroHash;
var zelhashFlowPool = zeroHash;
var zelhashforgetop = zeroHash;
var zelhashNibiruPool = zeroHash;
var zelhashpickaxe = zeroHash;
var zelhashwfm = zeroHash;
var zelhashXBTPool = zeroHash;
var zelhashFastBlocksPool = zeroHash;
var zelhashAltHashers = zeroHash;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// POOL GENERAL STATS API URLs
const zelurlCloudPoolsV2 = "http://mine.cloudpools.net:4000/api/pools/ZelCash";
const zelurlCoinbBlockers = "https://zel.coinblockers.com/api/stats";
const zelurlEquiPool = "https://equipool.1ds.us/api/stats";
const zelurlFastBlocksPool = "https://fastblocks.net/api/stats";
const zelurlXBTPool = "http://pool.xbtmoon.com:8080/api/stats";
const zelurlNibiruPool = "https://zel.nibirupool.com/api/stats";
const zelurlFlowPool = "http://www.flowmining.org/api/stats";
const zelurlwfm = "https://zpool.wfmpools.com/api/stats";
const zelurlpickaxe = "https://equi.pickaxe.pro/api/stats";
const zelurlforgetop = "https://zcl.forgetop.com/api/stats_all";
const zelurlAltHashers = "https://althashers.com/api/stats";

// CHANNEL IDs - CLOUDPOOLS SPECIFIC
const botlyfechan = '409793546577772575';
const zelchan = '409206258764349446';

// GET POOL HASHRATES
function getPoolHash() {
	
    request.get(zelurlCloudPoolsV2, (error, response, body) => {
        if (error) {
            zelhashCloudPoolsV2 = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashCloudPoolsV2 = (json.pool.poolStats.poolHashrate / 1000) + ' KSol/s';
            } catch (e) {
                zelhashCloudPoolsV2 = '0.00 KSol/s';
            }
        }
    });
	
    request.get(zelurlCoinbBlockers, (error, response, body) => {
        if (error) {
            zelhashCoinBlockers = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashCoinBlockers = json.pools.zelcash.hashrateString;
                zelCoinBlockersrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelCoinBlockersnetperhash = ((zelCoinBlockersrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashCoinBlockers = '0.00 KSol/s';
            }
        }
    });
	
    request.get(zelurlEquiPool, (error, response, body) => {
        if (error) {
            zelhashEquiPool = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashEquiPool = json.pools.zelcash.hashrateString;
                zelEquiPoolrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelEquiPoolnetperhash = ((zelEquiPoolrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashEquiPool = '0.00 KSol/s';
            }
        }
    });
	
    request.get({
        "rejectUnauthorized": false,
        "url": zelurlFastBlocksPool
    }, (error, response, body) => {
        if (error) {
            zelhashFastBlocksPool = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashFastBlocksPool = json.pools.zelcash.hashrateString;
                zelFastBlocksPoolrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelFastBlocksPoolnetperhash = ((zelFastBlocksPoolrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashFastBlocksPool = '0.00 KSol/s';
            }
        }
    });
	
    request.get(zelurlXBTPool, (error, response, body) => {
        if (error) {
            zelhashXBTPool = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashXBTPool = json.pools.zelcash.hashrateString;
                zelXBTPoolrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelXBTPoolnetperhash = ((zelXBTPoolrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashXBTPool = '0.00 KSol/s';
            }
        }
    });
	
    request.get(zelurlNibiruPool, (error, response, body) => {
        if (error) {
            zelhashNibiruPool = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashNibiruPool = json.pools.zelcash.hashrateString;
                zelNibiruPoolrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelNibiruPoolnetperhash = ((zelNibiruPoolrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashNibiruPool = '0.00 KSol/s';
            }
        }
    });
	
    request.get(zelurlFlowPool, (error, response, body) => {
        if (error) {
            zelhashFlowPool = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashFlowPool = json.pools.zelcash.hashrateString;
                zelFlowPoolrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelFlowPoolnetperhash = ((zelFlowPoolrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashFlowPool = '0.00 KSol/s';
            }
        }
    });
	
    request.get(zelurlwfm, (error, response, body) => {
        if (error) {
            zelhashwfm = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashwfm = json.pools.zelcash.hashrateString;
                zelwfmrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelwfmnetperhash = ((zelwfmrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashwfm = '0.00 KSol/s';
            }
        }
    });
    request.get(zelurlpickaxe, (error, response, body) => {
        if (error) {
            zelhashpickaxe = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashpickaxe = json.pools.zelcash.hashrateString;
                zelpickaxerealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelpickaxenetperhash = ((zelpickaxerealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashpickaxe = '0.00 KSol/s';
            }
        }
    });
	
    request.get(zelurlforgetop, (error, response, body) => {
        if (error) {
            zelhashforgetop = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashforgetop = json.zelcash.networkSolsString;
            } catch (e) {
                zelhashforgetop = '0.00 KSol/s';
            }
        }
    });
    
    request.get(zelurlAltHashers, (error, response, body) => {
        if (error) {
            zelhashAltHashers = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashAltHashers = json.zelcash.networkSolsString;
                zelAltHashersrealhash = ((json.pools.zelcash.hashrate * 2) / 1000) / 1000;
                zelAltHashersnetperhash = ((zelAltHashersrealhash / json.pools.zelcash.poolStats.networkSols) * 100).toFixed(2);
            } catch (e) {
                zelhashAlthashers = '0.00 KSol/s';
            }
        }
    });
setInterval(() => {
    getPoolHash();
    console.log(' __Please spread the hash. *No pool should have over 50% of total network hash.*__\r\n\r\n:pick:' +
        'Pools:\r\n<http://mine.CloudPools.net> ` (US) ` ` ' + zelhashCloudPoolsV2 +
        ' `\r\n<http://zel.CoinBlockers.com> ` (EU/US) ` ` ' + zelhashCoinBlockers +
        ' `\r\n<http://equipool.1ds.us> ` (US/EU/ASIA) ` ` ' + zelhashEquiPool +
        ' `\r\n<http://www.flowmining.org/> ` (EU) ` ` ' + zelhashFlowPool +
        ' `\r\n<https://zel.forgetop.com/> ` (EU/ASIA) ` ` ' + zelhashforgetop +
        ' `\r\n<https://zel.nibirupool.com> ` (EU) ` ` ' + zelhashNibiruPool +
        ' `\r\n<https://equi.pickaxe.pro> ` (US) ` ` ' + zelhashpickaxe +
        ' `\r\n<https://zpool.wfmpools.com/> ` ' + zelhashwfm +
        ' `\r\n<http://pool.xbtmoon.com/> ` (EU) ` ` ' + zelhashXBTPool +
        ' `\r\n<http://althashers.com/> ` (US) ` ` ' +zelhashAltHashers+        
        ' `\n\r\n*Data estimated and relative due to latency, etc.*'
    )
}, refreshIntervalTime);

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        switch (cmd) {
            case 'pools':
                bot.sendMessage({
                    to: channelID,
                    message: ' __Please spread the hash. *No pool should have over 50% of total network hash.*__\r\n\r\n:pick:' +
                    'Pools:\r\n<http://mine.CloudPools.net> ` (US) ` ` ' + zelhashCloudPoolsV2 +
                    ' `\r\n<http://zel.CoinBlockers.com> ` (EU/US) ` ` ' + zelhashCoinBlockers +
                    ' `\r\n<http://equipool.1ds.us> ` (US/EU/ASIA) ` ` ' + zelhashEquiPool +
                    ' `\r\n<http://www.flowmining.org/> ` (EU) ` ` ' + zelhashFlowPool +
                    ' `\r\n<https://zel.ForgeTop.com/> ` (EU/ASIA) ` ` ' + zelhashforgetop +
                    ' `\r\n<https://zel.nibirupool.com> ` (EU) ` ` ' + zelhashNibiruPool +
                    ' `\r\n<https://equi.pickaxe.pro> ` (US) ` ` ' + zelhashpickaxe +
                    ' `\r\n<https://zpool.wfmpools.com/> ` ' + zelhashwfm +
                    ' `\r\n<http://pool.xbtmoon.com/> ` (EU) ` ` ' + zelhashXBTPool +
                    ' `\r\n<http://althashers.com/> ` (US) ` ` ' +zelhashAltHashers+
                    ' `\n\r\n*Data estimated and relative due to latency, etc.*'
                });
                break;
            //' `\r\n<http://madmaxpool.hopto.org/> ` (US/CA) ` ` ' + zelhashMadMaxPool +
        }
    }
});
