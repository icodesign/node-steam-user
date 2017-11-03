const ByteBuffer = require('bytebuffer');
const SteamID = require('steamid');
const SteamUser = require('../index.js');
const Zlib = require('zlib');

const Schema = require('./protobufs.js');

const EMsg = SteamUser.EMsg;

const JOBID_NONE = '18446744073709551615';
const PROTO_MASK = 0x80000000;

var protobufs = {};
protobufs[EMsg.Multi] = Schema.CMsgMulti;
protobufs[EMsg.ClientLogon] = Schema.CMsgClientLogon;
protobufs[EMsg.ClientLogonGameServer] = Schema.CMsgClientLogon;
protobufs[EMsg.ClientLogOnResponse] = Schema.CMsgClientLogonResponse;
protobufs[EMsg.ClientLogOff] = Schema.CMsgClientLogOff;
protobufs[EMsg.ClientLoggedOff] = Schema.CMsgClientLoggedOff;
protobufs[EMsg.ClientUpdateMachineAuth] = Schema.CMsgClientUpdateMachineAuth;
protobufs[EMsg.ClientUpdateMachineAuthResponse] = Schema.CMsgClientUpdateMachineAuthResponse;
protobufs[EMsg.ClientNewLoginKey] = Schema.CMsgClientNewLoginKey;
protobufs[EMsg.ClientNewLoginKeyAccepted] = Schema.CMsgClientNewLoginKeyAccepted;
protobufs[EMsg.ClientRequestWebAPIAuthenticateUserNonce] = Schema.CMsgClientRequestWebAPIAuthenticateUserNonce;
protobufs[EMsg.ClientRequestWebAPIAuthenticateUserNonceResponse] = Schema.CMsgClientRequestWebAPIAuthenticateUserNonceResponse;
protobufs[EMsg.ClientCMList] = Schema.CMsgClientCMList;
protobufs[EMsg.ClientItemAnnouncements] = Schema.CMsgClientItemAnnouncements;
protobufs[EMsg.ClientRequestItemAnnouncements] = Schema.CMsgClientRequestItemAnnouncements;
protobufs[EMsg.ClientCommentNotifications] = Schema.CMsgClientCommentNotifications;
protobufs[EMsg.ClientRequestCommentNotifications] = Schema.CMsgClientRequestCommentNotifications;
protobufs[EMsg.ClientUserNotifications] = Schema.CMsgClientUserNotifications;
protobufs[EMsg.ClientFSOfflineMessageNotification] = Schema.CMsgClientOfflineMessageNotification;
protobufs[EMsg.ClientFSRequestOfflineMessageCount] = Schema.CMsgClientRequestOfflineMessageCount;
protobufs[EMsg.ClientGamesPlayed] = Schema.CMsgClientGamesPlayed;
protobufs[EMsg.ClientAccountInfo] = Schema.CMsgClientAccountInfo;
protobufs[EMsg.ClientEmailAddrInfo] = Schema.CMsgClientEmailAddrInfo;
protobufs[EMsg.ClientIsLimitedAccount] = Schema.CMsgClientIsLimitedAccount;
protobufs[EMsg.ClientWalletInfoUpdate] = Schema.CMsgClientWalletInfoUpdate;
protobufs[EMsg.ClientLicenseList] = Schema.CMsgClientLicenseList;
protobufs[EMsg.ClientServiceMethod] = Schema.CMsgClientServiceMethod;
protobufs[EMsg.ClientServiceMethodResponse] = Schema.CMsgClientServiceMethodResponse;
protobufs[EMsg.ClientGMSServerQuery] = Schema.CMsgClientGMSServerQuery;
protobufs[EMsg.GMSClientServerQueryResponse] = Schema.CMsgGMSClientServerQueryResponse;
protobufs[EMsg.ClientPICSChangesSinceRequest] = Schema.CMsgClientPICSChangesSinceRequest;
protobufs[EMsg.ClientPICSChangesSinceResponse] = Schema.CMsgClientPICSChangesSinceResponse;
protobufs[EMsg.ClientPICSProductInfoRequest] = Schema.CMsgClientPICSProductInfoRequest;
protobufs[EMsg.ClientPICSProductInfoResponse] = Schema.CMsgClientPICSProductInfoResponse;
protobufs[EMsg.ClientPICSAccessTokenRequest] = Schema.CMsgClientPICSAccessTokenRequest;
protobufs[EMsg.ClientPICSAccessTokenResponse] = Schema.CMsgClientPICSAccessTokenResponse;
protobufs[EMsg.ClientCreateAccountProto] = Schema.CMsgClientCreateAccount;
protobufs[EMsg.ClientCreateAccountProtoResponse] = Schema.CMsgClientCreateAccountResponse;
protobufs[EMsg.EconTrading_InitiateTradeRequest] = Schema.CMsgTrading_InitiateTradeRequest;
protobufs[EMsg.EconTrading_InitiateTradeResponse] = Schema.CMsgTrading_InitiateTradeResponse;
protobufs[EMsg.EconTrading_CancelTradeRequest] = Schema.CMsgTrading_CancelTradeRequest;
protobufs[EMsg.EconTrading_InitiateTradeProposed] = Schema.CMsgTrading_InitiateTradeRequest;
protobufs[EMsg.EconTrading_InitiateTradeResult] = Schema.CMsgTrading_InitiateTradeResponse;
protobufs[EMsg.EconTrading_StartSession] = Schema.CMsgTrading_StartSession;
protobufs[EMsg.ClientChangeStatus] = Schema.CMsgClientChangeStatus;
protobufs[EMsg.ClientAddFriend] = Schema.CMsgClientAddFriend;
protobufs[EMsg.ClientAddFriendResponse] = Schema.CMsgClientAddFriendResponse;
protobufs[EMsg.ClientRemoveFriend] = Schema.CMsgClientRemoveFriend;
protobufs[EMsg.ClientFSGetFriendsSteamLevels] = Schema.CMsgClientFSGetFriendsSteamLevels;
protobufs[EMsg.ClientFSGetFriendsSteamLevelsResponse] = Schema.CMsgClientFSGetFriendsSteamLevelsResponse;
protobufs[EMsg.ClientPersonaState] = Schema.CMsgClientPersonaState;
protobufs[EMsg.ClientClanState] = Schema.CMsgClientClanState;
protobufs[EMsg.ClientFriendsList] = Schema.CMsgClientFriendsList;
protobufs[EMsg.ClientRequestFriendData] = Schema.CMsgClientRequestFriendData;
protobufs[EMsg.ClientFriendMsg] = Schema.CMsgClientFriendMsg;
protobufs[EMsg.ClientChatInvite] = Schema.CMsgClientChatInvite;
protobufs[EMsg.ClientFriendMsgIncoming] = Schema.CMsgClientFriendMsgIncoming;
protobufs[EMsg.ClientFriendMsgEchoToSender] = Schema.CMsgClientFriendMsgIncoming;
protobufs[EMsg.ClientFSGetFriendMessageHistory] = Schema.CMsgClientChatGetFriendMessageHistory;
protobufs[EMsg.ClientFSGetFriendMessageHistoryResponse] = Schema.CMsgClientChatGetFriendMessageHistoryResponse;
protobufs[EMsg.ClientFriendsGroupsList] = Schema.CMsgClientFriendsGroupsList;
protobufs[EMsg.ClientPlayerNicknameList] = Schema.CMsgClientPlayerNicknameList;
protobufs[EMsg.AMClientSetPlayerNickname] = Schema.CMsgClientSetPlayerNickname;
protobufs[EMsg.AMClientSetPlayerNicknameResponse] = Schema.CMsgClientSetPlayerNicknameResponse;
protobufs[EMsg.ClientRegisterKey] = Schema.CMsgClientRegisterKey;
protobufs[EMsg.ClientPurchaseResponse] = Schema.CMsgClientPurchaseResponse;
protobufs[EMsg.ClientRequestFreeLicense] = Schema.CMsgClientRequestFreeLicense;
protobufs[EMsg.ClientRequestFreeLicenseResponse] = Schema.CMsgClientRequestFreeLicenseResponse;
protobufs[EMsg.ClientGetNumberOfCurrentPlayersDP] = Schema.CMsgDPGetNumberOfCurrentPlayers;
protobufs[EMsg.ClientGetNumberOfCurrentPlayersDPResponse] = Schema.CMsgDPGetNumberOfCurrentPlayersResponse;
protobufs[EMsg.ClientGetAppOwnershipTicket] = Schema.CMsgClientGetAppOwnershipTicket;
protobufs[EMsg.ClientGetAppOwnershipTicketResponse] = Schema.CMsgClientGetAppOwnershipTicketResponse;
protobufs[EMsg.ClientGameConnectTokens] = Schema.CMsgClientGameConnectTokens;
protobufs[EMsg.ClientAuthList] = Schema.CMsgClientAuthList;
protobufs[EMsg.ClientAuthListAck] = Schema.CMsgClientAuthListAck;
protobufs[EMsg.ClientTicketAuthComplete] = Schema.CMsgClientTicketAuthComplete;
protobufs[EMsg.ClientRequestEncryptedAppTicket] = Schema.CMsgClientRequestEncryptedAppTicket;
protobufs[EMsg.ClientRequestEncryptedAppTicketResponse] = Schema.CMsgClientRequestEncryptedAppTicketResponse;
protobufs[EMsg.ClientCurrentUIMode] = Schema.CMsgClientUIMode;
protobufs[EMsg.ClientVanityURLChangedNotification] = Schema.CMsgClientVanityURLChangedNotification;
protobufs[EMsg.ClientAMGetPersonaNameHistory] = Schema.CMsgClientAMGetPersonaNameHistory;
protobufs[EMsg.ClientAMGetPersonaNameHistoryResponse] = Schema.CMsgClientAMGetPersonaNameHistoryResponse;
protobufs[EMsg.ClientUnlockStreaming] = Schema.CMsgAMUnlockStreaming;
protobufs[EMsg.ClientUnlockStreamingResponse] = Schema.CMsgAMUnlockStreamingResponse;
protobufs[EMsg.ClientEmailChange4] = Schema.CMsgClientEmailChange;
protobufs[EMsg.ClientEmailChangeResponse4] = Schema.CMsgClientEmailChangeResponse;
protobufs[EMsg.ClientServerList] = Schema.CMsgClientServerList;
protobufs[EMsg.ClientGetDepotDecryptionKey] = Schema.CMsgClientGetDepotDecryptionKey;
protobufs[EMsg.ClientGetDepotDecryptionKeyResponse] = Schema.CMsgClientGetDepotDecryptionKeyResponse;
protobufs[EMsg.ClientGetCDNAuthToken] = Schema.CMsgClientGetCDNAuthToken;
protobufs[EMsg.ClientGetCDNAuthTokenResponse] = Schema.CMsgClientGetCDNAuthTokenResponse;
protobufs[EMsg.ClientCheckAppBetaPassword] = Schema.CMsgClientCheckAppBetaPassword;
protobufs[EMsg.ClientCheckAppBetaPasswordResponse] = Schema.CMsgClientCheckAppBetaPasswordResponse;
protobufs[EMsg.ClientKickPlayingSession] = Schema.CMsgClientKickPlayingSession;
protobufs[EMsg.ClientPlayingSessionState] = Schema.CMsgClientPlayingSessionState;

// Unified protobufs
protobufs['GameServers.GetServerList#1_Request'] = Schema.CGameServers_GetServerList_Request;
protobufs['GameServers.GetServerList#1_Response'] = Schema.CGameServers_GetServerList_Response;
protobufs['GameServers.GetServerSteamIDsByIP#1_Request'] = Schema.CGameServers_GetServerSteamIDsByIP_Request;
protobufs['GameServers.GetServerSteamIDsByIP#1_Response'] = Schema.CGameServers_IPsWithSteamIDs_Response;
protobufs['GameServers.GetServerIPsBySteamID#1_Request'] = Schema.CGameServers_GetServerIPsBySteamID_Request;
protobufs['GameServers.GetServerIPsBySteamID#1_Response'] = Schema.CGameServers_IPsWithSteamIDs_Response;
protobufs['TwoFactor.AddAuthenticator#1_Request'] = Schema.CTwoFactor_AddAuthenticator_Request;
protobufs['TwoFactor.AddAuthenticator#1_Response'] = Schema.CTwoFactor_AddAuthenticator_Response;
protobufs['TwoFactor.FinalizeAddAuthenticator#1_Request'] = Schema.CTwoFactor_FinalizeAddAuthenticator_Request;
protobufs['TwoFactor.FinalizeAddAuthenticator#1_Response'] = Schema.CTwoFactor_FinalizeAddAuthenticator_Response;
protobufs['TwoFactor.SendEmail#1_Request'] = Schema.CTwoFactor_SendEmail_Request;
protobufs['TwoFactor.SendEmail#1_Response'] = Schema.CTwoFactor_SendEmail_Response;
protobufs['TwoFactor.RemoveAuthenticator#1_Request'] = Schema.CTwoFactor_RemoveAuthenticator_Request;
protobufs['TwoFactor.RemoveAuthenticator#1_Response'] = Schema.CTwoFactor_RemoveAuthenticator_Response;
protobufs['Credentials.GetSteamGuardDetails#1_Request'] = Schema.CCredentials_GetSteamGuardDetails_Request;
protobufs['Credentials.GetSteamGuardDetails#1_Response'] = Schema.CCredentials_GetSteamGuardDetails_Response;
protobufs['Credentials.GetAccountAuthSecret#1_Request'] = Schema.CCredentials_GetAccountAuthSecret_Request;
protobufs['Credentials.GetAccountAuthSecret#1_Response'] = Schema.CCredentials_GetAccountAuthSecret_Response;
protobufs['Credentials.GetCredentialChangeTimeDetails#1_Request'] = Schema.CCredentials_LastCredentialChangeTime_Request;
protobufs['Credentials.GetCredentialChangeTimeDetails#1_Response'] = Schema.CCredentials_LastCredentialChangeTime_Response;
protobufs['PublishedFile.GetDetails#1_Request'] = Schema.CPublishedFile_GetDetails_Request;
protobufs['PublishedFile.GetDetails#1_Response'] = Schema.CPublishedFile_GetDetails_Response;
protobufs['Player.GetGameBadgeLevels#1_Request'] = Schema.CPlayer_GetGameBadgeLevels_Request;
protobufs['Player.GetGameBadgeLevels#1_Response'] = Schema.CPlayer_GetGameBadgeLevels_Response;
protobufs['Player.GetNicknameList#1_Request'] = Schema.CPlayer_GetNicknameList_Request;
protobufs['Player.GetNicknameList#1_Response'] = Schema.CPlayer_GetNicknameList_Response;
protobufs['PlayerClient.NotifyFriendNicknameChanged#1'] = Schema.CPlayer_FriendNicknameChanged_Notification;

ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.LITTLE_ENDIAN;

/**
 * @param {int|object} emsgOrHeader
 * @param {object|Buffer|ByteBuffer} body
 * @param {function} [callback]
 * @private
 */
SteamUser.prototype._send = function(emsgOrHeader, body, callback) {
	// header fields: msg, proto, sourceJobID, targetJobID
	var header = typeof emsgOrHeader === 'object' ? emsgOrHeader : {"msg": emsgOrHeader};
	let emsg = header.msg;

	let canWeSend = this.steamID || (this._tempSteamID && [EMsg.ChannelEncryptResponse, EMsg.ClientLogon].includes(emsg));
	if (!canWeSend) {
		// We're disconnected, drop it
		this.emit('debug', 'Dropping message ' + emsg + ' because we\'re not logged on.');
		return;
	}

	var Proto = protobufs[emsg];
	if (Proto) {
		header.proto = {};
		body = new Proto(body).toBuffer();
	} else if (ByteBuffer.isByteBuffer(body)) {
		body = body.toBuffer();
	}

	let jobIdSource = null;
	if (callback) {
		jobIdSource = ++this._currentJobID;
		this._jobs[jobIdSource] = callback;
	}

	if (this.options.debug) {
		for (var i in EMsg) {
			if (EMsg.hasOwnProperty(i) && EMsg[i] == emsg) {
				emsg = i;
				break;
			}
		}
	}

	this.emit('debug', 'Sending message: ' + emsg);
	
	// Make the header
	let hdrBuf;
	if (header.msg == EMsg.ChannelEncryptResponse) {
		// since we're setting up the encrypted channel, we use this very minimal header
		hdrBuf = ByteBuffer.allocate(4 + 8 + 8, ByteBuffer.LITTLE_ENDIAN);
		hdrBuf.writeUint32(header.msg);
		hdrBuf.writeUint64(header.targetJobID || JOBID_NONE);
		hdrBuf.writeUint64(jobIdSource || header.sourceJobID || JOBID_NONE);
	} else if (header.proto) {
		// if we have a protobuf header, use that
		header.proto.client_sessionid = this._sessionID || 0;
		header.proto.steamid = (this.steamID || this._tempSteamID).getSteamID64();
		header.proto.jobid_source = jobIdSource || header.proto.jobid_source || header.sourceJobID || JOBID_NONE;
		header.proto.jobid_target = header.proto.jobid_target || header.targetJobID || JOBID_NONE;
		let hdrProtoBuf = (new Schema.CMsgProtoBufHeader(header.proto)).toBuffer();
		hdrBuf = ByteBuffer.allocate(4 + 4 + hdrProtoBuf.length, ByteBuffer.LITTLE_ENDIAN);
		hdrBuf.writeUint32(header.msg | PROTO_MASK);
		hdrBuf.writeUint32(hdrProtoBuf.length);
		hdrBuf.append(hdrProtoBuf);
	} else {
		// this is the standard non-protobuf extended header
		hdrBuf = ByteBuffer.allocate(4 + 1 + 2 + 8 + 8 + 1 + 8 + 4, ByteBuffer.LITTLE_ENDIAN);
		hdrBuf.writeUint32(header.msg);
		hdrBuf.writeByte(36);
		hdrBuf.writeUint16(2);
		hdrBuf.writeUint64(header.targetJobID || JOBID_NONE);
		hdrBuf.writeUint64(jobIdSource || header.sourceJobID || JOBID_NONE);
		hdrBuf.writeByte(239);
		hdrBuf.writeUint64((this.steamID || this._tempSteamID).getSteamID64());
		hdrBuf.writeUint32(this._sessionID || 0);
	}

	this._connection.send(Buffer.concat([hdrBuf.flip().toBuffer(), body]));
};

/**
 * Handles a raw binary netmessage by parsing the header and routing it appropriately
 * @param {Buffer} buffer
 * @private
 */
SteamUser.prototype._handleNetMessage = function(buffer) {
	let buf = ByteBuffer.wrap(buffer, ByteBuffer.LITTLE_ENDIAN);

	let rawEMsg = buf.readUint32();
	let eMsg = rawEMsg & ~PROTO_MASK;
	let isProtobuf = !!(rawEMsg & PROTO_MASK);

	let header = {"msg": eMsg};
	if ([EMsg.ChannelEncryptRequest, EMsg.ChannelEncryptResult].includes(eMsg)) {
		// for encryption setup, we just have a very small header with two fields
		header.targetJobID = buf.readUint64().toString();
		header.sourceJobID = buf.readUint64().toString();
	} else if (isProtobuf) {
		// decode the protobuf header
		let headerLength = buf.readUint32();
		header.proto = Schema.CMsgProtoBufHeader.decode(buf.slice(buf.offset, buf.offset + headerLength));
		buf.skip(headerLength);
	} else {
		// decode the extended header
		buf.skip(3); // 1 byte for header size (fixed at 36), 2 bytes for header version (fixed at 2)
		header.targetJobID = buf.readUint64().toString();
		header.sourceJobID = buf.readUint64().toString();
		buf.skip(1); // 1 byte for header canary (fixed at 239)
		header.steamID = buf.readUint64().toString();
		header.sessionID = buf.readUint32();
	}

	let sessionID = (header.proto && header.proto.client_sessionid) || header.sessionID;
	let steamID = (header.proto && header.proto.steamid) || header.steamID;
	if (sessionID && sessionID != this._sessionID) {
		this._sessionID = sessionID;
		this.steamID = new SteamID(steamID.toString());
		delete this._tempSteamID;
	}
	
	this._handleMessage(header, buf.slice());
};

/**
 * Handles and routes a parsed message
 * @param {object} header
 * @param {ByteBuffer} bodyBuf
 * @private
 */
SteamUser.prototype._handleMessage = function(header, bodyBuf) {
	var msgName = header.msg;
	var handlerName = header.msg;

	if (this.options.debug) {
		for (var i in EMsg) {
			if (EMsg.hasOwnProperty(i) && EMsg[i] == header.msg) {
				msgName = i;
				break;
			}
		}
	}

	if (header.msg == EMsg.ServiceMethod) {
		if (header.proto && header.proto.target_job_name) {
			handlerName = msgName = header.proto.target_job_name;
		} else {
			this.emit('debug', 'Got ServiceMethod without target_job_name');
			return;
		}
	}

	if (header.msg != EMsg.ServiceMethod && header.proto && header.proto.target_job_name) {
		this.emit('debug', 'Got unknown target_job_name ' + header.proto.target_job_name + ' for msg ' + msgName);
	}

	if (!this._handlers[handlerName]) {
		this.emit('debug', 'Unhandled message: ' + msgName);
		return;
	}

	let body = bodyBuf;
	if (protobufs[handlerName]) {
		body = protobufs[handlerName].decode(bodyBuf);
	}

	this.emit('debug', 'Handled message: ' + msgName);

	var cb = null;
	if (header.sourceJobID != JOBID_NONE) {
		// this message expects a response. make a callback we can pass to the end-user.
		cb = (emsgOrHeader, body) => {
			// once invoked the callback should set the jobid_target
			var responseHeader = typeof emsgOrHeader === 'object' ? emsgOrHeader : {"msg": emsgOrHeader};
			let emsg = responseHeader.msg;

			if (protobufs[emsg]) {
				responseHeader.proto = {"jobid_target": header.sourceJobID};
				body = new protobufs[emsg](body).toBuffer();
			} else {
				responseHeader.targetJobID = header.sourceJobID;
			}

			this._send(responseHeader, body);
		}
	}

	if (!this._handlers[handlerName]) {
		// last sanity check
		this.emit('debug', 'SANITY CHECK FAILED: No handler for ' + handlerName);
		return;
	}

	if (this._jobs[header.targetJobID]) {
		// this is a response to something, so invoke the appropriate callback
		this._jobs[header.targetJobID].call(this, body, cb);
	} else {
		this._handlers[handlerName].call(this, body, cb);
	}
};

// Handlers

SteamUser.prototype._handlers[EMsg.Multi] = function(body) {
	this.emit('debug', 'Processing ' + (body.size_unzipped ? 'gzipped ' : '') + 'multi msg');

	let payload = body.message_body.toBuffer();
	if (body.size_unzipped) {
		Zlib.gunzip(payload, (err, unzipped) => {
			if (err) {
				this.emit('error', err);
				this._disconnect(true); // TODO: Make sure this doesn't emit 'disconnected'
				return;
			}

			processMulti.call(this, unzipped);
		});
	} else {
		processMulti.call(this, payload);
	}

	function processMulti(payload) {
		while (payload.length && (this.steamID || this._tempSteamID)) {
			let subSize = payload.readUInt32LE(0);
			this._handleNetMessage(payload.slice(4, 4 + subSize));
			payload = payload.slice(4 + subSize);
		}
	}
};

// Unified messages

/**
 * Send a unified message.
 * @param {string} methodName - In format Interface.Method#Version, e.g. Foo.DoThing#1
 * @param {object} methodData
 * @param {boolean} notification
 * @param {function} callback
 * @private
 */
SteamUser.prototype._sendUnified = function(methodName, methodData, notification, callback) {
	var cb;
	if (callback && protobufs[methodName + '_Response']) {
		cb = function(body) {
			var Proto = protobufs[methodName + '_Response'];
			callback(Proto.decode(body.serialized_method_response));
		};
	}

	var Proto = protobufs[methodName + '_Request'];
	this._send(EMsg.ClientServiceMethod, {
		"method_name": methodName,
		"serialized_method": new Proto(methodData).toBuffer(),
		"is_notification": notification
	}, cb);
};
