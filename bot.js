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
var zelhashforgetopsolo = zeroHash;
var zelhashNibiruPool = zeroHash;
var zelhashpickaxe = zeroHash;
var zelhashwfm = zeroHash;
var zelhashXBTPool = zeroHash;
var zelhashFastBlocksPool = zeroHash;
var zelhashAltHashers = zeroHash;
var zelhashLamboMoon = zeroHash;
var zelhashRagnarPool = zeroHash;

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
const zelurlforgetop = "https://notifications.forgetop.com/api/stats_all";
const zelurlAltHashers = "https://althashers.com/api/stats";
const zelurlLamboMoon = "https://lambomoon.club/api/stats";
const zelurlRagnarpool = "https://zel.ragnarpool.ovh/api/stats";

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
                zelhashCloudPoolsV2 = 'BORKED';
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
            } catch (e) {
                zelhashCoinBlockers = 'BORKED';
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
            } catch (e) {
                zelhashEquiPool = 'BORKED';
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
            } catch (e) {
                zelhashFastBlocksPool = 'BORKED';
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
            } catch (e) {
                zelhashXBTPool = 'BORKED';
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
            } catch (e) {
                zelhashNibiruPool = 'BORKED';
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
            } catch (e) {
                zelhashFlowPool = 'BORKED';
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
            } catch (e) {
                zelhashwfm = 'BORKED';
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
            } catch (e) {
                zelhashpickaxe = 'BORKED';
            }
        }
    });
	
    request.get(zelurlforgetop, (error, response, body) => {
        if (error) {
            zelhashforgetopsolo = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashforgetopsolo = json.zelsolo.networkSolsString;
            } catch (e) {
                zelhashforgetopsolo = '0.00 KSol/s';
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
                zelhashAltHashers = json.pools.zelcash.hashrateString;
            } catch (e) {
                zelhashAlthashers = '0.00 KSol/s';
            }
        }
    });
	request.get(zelurlLamboMoon, (error, response, body) => {
        if (error) {
            zelhashLamboMoon = zeroHash
        } else {
            try {
                let json = JSON.parse(body);
                zelhashLamboMoon = json.pools.zelcash.hashrateString;
            } catch (e) {
                zelhashAlthashers = '0.00 KSol/s';
            }
        }
    });
}
setInterval(() => {
    getPoolHash();
    console.log(' __Please spread the hash. *No pool should have over 50% of total network hash.*__\r\n\r\n:pick:' +
        'Pools:\r\n<http://mine.CloudPools.net> ` (US) ` ` ' + zelhashCloudPoolsV2 +
        ' `\r\n<http://zel.CoinBlockers.com> ` (EU/US) ` ` ' + zelhashCoinBlockers +
        ' `\r\n<http://equipool.1ds.us> ` (US/EU/ASIA) ` ` ' + zelhashEquiPool +
        ' `\r\n<http://www.flowmining.org> ` (EU) ` ` ' + zelhashFlowPool +
        ' `\r\n<https://zel.forgetop.com> ` (EU/ASIA) ` ` ' + zelhashforgetop +
	' `\r\n<https://zel-solo.forgetop.com> ` (EU/ASIA) ` ` ' + zelhashforgetopsolo +
        ' `\r\n<https://zel.nibirupool.com> ` (EU) ` ` ' + zelhashNibiruPool +
        ' `\r\n<https://equi.pickaxe.pro> ` (US) ` ` ' + zelhashpickaxe +
        ' `\r\n<https://zpool.wfmpools.com> ` ' + zelhashwfm +
        ' `\r\n<http://pool.xbtmoon.com> ` (EU) ` ` ' + zelhashXBTPool +
        ' `\r\n<http://althashers.com> ` (US) ` ` ' + zelhashAltHashers +
		' `\r\n<https://lambomoon.club> ` (US) ` ` ' + zelhashLamboMoon +
		' `\r\n<https://zel.ragnarpool.ovh> ` (EU) ` ` ' + zelhashRagnarPool +
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
                    ' `\r\n<http://www.flowmining.org> ` (EU) ` ` ' + zelhashFlowPool +
                    ' `\r\n<https://zel.ForgeTop.com> ` (EU/ASIA) ` ` ' + zelhashforgetop +
		    ' `\r\n<https://zel-solo.forgetop.com> ` (EU/ASIA) ` ` ' + zelhashforgetopsolo +
                    ' `\r\n<https://zel.nibirupool.com> ` (EU) ` ` ' + zelhashNibiruPool +
                    ' `\r\n<https://equi.pickaxe.pro> ` (US) ` ` ' + zelhashpickaxe +
                    ' `\r\n<https://zpool.wfmpools.com> ` ' + zelhashwfm +
                    ' `\r\n<http://pool.xbtmoon.com> ` (EU) ` ` ' + zelhashXBTPool +
                    ' `\r\n<http://althashers.com> ` (US) ` ` ' + zelhashAltHashers +
					' `\r\n<https://lambomoon.club> ` (US) ` ` ' + zelhashLamboMoon +
			' `\r\n<https://zel.ragnarpool.ovh> ` (EU) ` ` ' + zelhashRagnarPool +
                    ' `\n\r\n*Data estimated and relative due to latency, etc.*'
                });
                break;
            //' `\r\n<http://madmaxpool.hopto.org/> ` (US/CA) ` ` ' + zelhashMadMaxPool +
        }
    }
});
