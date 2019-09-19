// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/Connection.d.ts
declare module '~mysql/lib/Connection' {

import Query = require('~mysql/lib/protocol/sequences/Query');
import {OkPacket, FieldPacket, RowDataPacket} from '~mysql/lib/protocol/packets/index';
import {EventEmitter} from 'events';

namespace Connection {

    export interface ConnectionOptions {
        /**
         * The MySQL user to authenticate as
         */
        user?: string;

        /**
         * The password of that MySQL user
         */
        password?: string;

        /**
         * Name of the database to use for this connection
         */
        database?: string;

        /**
         * The charset for the connection. This is called 'collation' in the SQL-level of MySQL (like utf8_general_ci).
         * If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used.
         * (Default: 'UTF8_GENERAL_CI')
         */
        charset?: string;

        /**
         * The hostname of the database you are connecting to. (Default: localhost)
         */
        host?: string;

        /**
         * The port number to connect to. (Default: 3306)
         */
        port?: number;

        /**
         * The source IP address to use for TCP connection
         */
        localAddress?: string;

        /**
         * The path to a unix domain socket to connect to. When used host and port are ignored
         */
        socketPath?: string;

        /**
         * The timezone used to store local dates. (Default: 'local')
         */
        timezone?: string | 'local';

        /**
         * The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10 seconds)
         */
        connectTimeout?: number;

        /**
         * Stringify objects instead of converting to values. (Default: 'false')
         */
        stringifyObjects?: boolean;

        /**
         * Allow connecting to MySQL instances that ask for the old (insecure) authentication method. (Default: false)
         */
        insecureAuth?: boolean;

        /**
         * Determines if column values should be converted to native JavaScript types. It is not recommended (and may go away / change in the future)
         * to disable type casting, but you can currently do so on either the connection or query level. (Default: true)
         *
         * You can also specify a function (field: any, next: () => void) => {} to do the type casting yourself.
         *
         * WARNING: YOU MUST INVOKE the parser using one of these three field functions in your custom typeCast callback. They can only be called once.
         *
         * field.string()
         * field.buffer()
         * field.geometry()
         *
         * are aliases for
         *
         * parser.parseLengthCodedString()
         * parser.parseLengthCodedBuffer()
         * parser.parseGeometryValue()
         *
         * You can find which field function you need to use by looking at: RowDataPacket.prototype._typeCast
         */
        typeCast?: boolean | ((field: any, next: () => void) => any);

        /**
         * A custom query format function
         */
        queryFormat?: (query: string, values: any) => void;

        /**
         * When dealing with big numbers (BIGINT and DECIMAL columns) in the database, you should enable this option
         * (Default: false)
         */
        supportBigNumbers?: boolean;

        /**
         * Enabling both supportBigNumbers and bigNumberStrings forces big numbers (BIGINT and DECIMAL columns) to be
         * always returned as JavaScript String objects (Default: false). Enabling supportBigNumbers but leaving
         * bigNumberStrings disabled will return big numbers as String objects only when they cannot be accurately
         * represented with [JavaScript Number objects] (http://ecma262-5.com/ELS5_HTML.htm#Section_8.5)
         * (which happens when they exceed the [-2^53, +2^53] range), otherwise they will be returned as Number objects.
         * This option is ignored if supportBigNumbers is disabled.
         */
        bigNumberStrings?: boolean;

        /**
         * Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date
         * objects. (Default: false)
         */
        dateStrings?: boolean;

        /**
         * This will print all incoming and outgoing packets on stdout.
         * You can also restrict debugging to packet types by passing an array of types (strings) to debug;
         *
         * (Default: false)
         */
        debug?: any;

        /**
         * Generates stack traces on Error to include call site of library entrance ('long stack traces'). Slight
         * performance penalty for most calls. (Default: true)
         */
        trace?: boolean;

        /**
         * Allow multiple mysql statements per query. Be careful with this, it exposes you to SQL injection attacks. (Default: false)
         */
        multipleStatements?: boolean;

        /**
         * List of connection flags to use other than the default ones. It is also possible to blacklist default ones
         */
        flags?: Array<string>;

        /**
         * object with ssl parameters or a string containing name of ssl profile
         */
        ssl?: string | SslOptions;
    }

    export interface SslOptions {
        /**
         * A string or buffer holding the PFX or PKCS12 encoded private key, certificate and CA certificates
         */
        pfx?: string;

        /**
         * A string holding the PEM encoded private key
         */
        key?: string;

        /**
         * A string of passphrase for the private key or pfx
         */
        passphrase?: string;

        /**
         * A string holding the PEM encoded certificate
         */
        cert?: string;

        /**
         * Either a string or list of strings of PEM encoded CA certificates to trust.
         */
        ca?: string | string[];

        /**
         * Either a string or list of strings of PEM encoded CRLs (Certificate Revocation List)
         */
        crl?: string | string[];

        /**
         * A string describing the ciphers to use or exclude
         */
        ciphers?: string;

        /**
         * You can also connect to a MySQL server without properly providing the appropriate CA to trust. You should not do this.
         */
        rejectUnauthorized?: boolean;
    }
}

class Connection extends EventEmitter {

    config: Connection.ConnectionOptions;
    threadId: number;

    static createQuery<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(sql: string, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;
    static createQuery<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(sql: string, values: any | any[] | { [param: string]: any }, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;

    beginTransaction(callback: (err: Query.QueryError | null) => void): void;

    connect(callback?: (err: Query.QueryError | null) => void): void;

    commit(callback?: (err: Query.QueryError | null) => void): void;

    changeUser(options: Connection.ConnectionOptions, callback?: (err: Query.QueryError | null) => void): void;

    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(sql: string, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(sql: string, values: any | any[] | { [param: string]: any }, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(options: Query.QueryOptions, callback?: (err: Query.QueryError | null, result: T, fields?: FieldPacket[]) => any): Query;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(options: Query.QueryOptions, values: any | any[] | { [param: string]: any }, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;

    end(callback?: (err: Query.QueryError | null) => void): void;
    end(options: any, callback?: (err: Query.QueryError | null) => void): void;

    destroy(): void;

    pause(): void;

    resume(): void;

    escape(value: any): string;

    escapeId(value: string): string;
    escapeId(values: string[]): string;

    format(sql: string, values?: any | any[] | { [param: string]: any }): string;

    on(event: string, listener: Function): this;

    rollback(callback: () => void): void;
}

export = Connection;
}
declare module 'mysql/lib/Connection' {
import main = require('~mysql/lib/Connection');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/PoolConnection.d.ts
declare module '~mysql/lib/PoolConnection' {

import Connection = require('~mysql/lib/Connection');

class PoolConnection extends Connection {
    release(): void;
}

export = PoolConnection;
}
declare module 'mysql/lib/PoolConnection' {
import main = require('~mysql/lib/PoolConnection');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/Pool.d.ts
declare module '~mysql/lib/Pool' {

import Query = require('~mysql/lib/protocol/sequences/Query');
import {OkPacket, RowDataPacket, FieldPacket} from '~mysql/lib/protocol/packets/index';
import Connection = require('~mysql/lib/Connection');
import PoolConnection = require('~mysql/lib/PoolConnection');
import {EventEmitter} from 'events';

namespace Pool {

    export interface PoolOptions extends Connection.ConnectionOptions {
        /**
         * The milliseconds before a timeout occurs during the connection acquisition. This is slightly different from connectTimeout,
         * because acquiring a pool connection does not always involve making a connection. (Default: 10 seconds)
         */
        acquireTimeout?: number;

        /**
         * Determines the pool's action when no connections are available and the limit has been reached. If true, the pool will queue
         * the connection request and call it when one becomes available. If false, the pool will immediately call back with an error.
         * (Default: true)
         */
        waitForConnections?: boolean;

        /**
         * The maximum number of connections to create at once. (Default: 10)
         */
        connectionLimit?: number;

        /**
         * The maximum number of connection requests the pool will queue before returning an error from getConnection. If set to 0, there
         * is no limit to the number of queued connection requests. (Default: 0)
         */
        queueLimit?: number;
    }
}

class Pool extends EventEmitter {

    config: Pool.PoolOptions;

    getConnection(callback: (err: NodeJS.ErrnoException, connection: PoolConnection) => any): void;

    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(sql: string, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(sql: string, values: any | any[] | { [param: string]: any }, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(options: Query.QueryOptions, callback?: (err: Query.QueryError | null, result: T, fields?: FieldPacket[]) => any): Query;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[]>(options: Query.QueryOptions, values: any | any[] | { [param: string]: any }, callback?: (err: Query.QueryError | null, result: T, fields: FieldPacket[]) => any): Query;

    end(callback?: (err: NodeJS.ErrnoException | null, ...args: any[]) => any): void;

    on(event: string, listener: Function): this;
    on(event: 'connection', listener: (connection: PoolConnection) => any): this;
}

export = Pool;
}
declare module 'mysql/lib/Pool' {
import main = require('~mysql/lib/Pool');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/PoolCluster.d.ts
declare module '~mysql/lib/PoolCluster' {

import Connection = require('~mysql/lib/Connection');
import PoolConnection = require('~mysql/lib/PoolConnection');
import {EventEmitter} from 'events';

namespace PoolCluster {

    export interface PoolClusterOptions {
        /**
         * If true, PoolCluster will attempt to reconnect when connection fails. (Default: true)
         */
        canRetry?: boolean;

        /**
         * If connection fails, node's errorCount increases. When errorCount is greater than removeNodeErrorCount,
         * remove a node in the PoolCluster. (Default: 5)
         */
        removeNodeErrorCount?: number;

        /**
         * If connection fails, specifies the number of milliseconds before another connection attempt will be made.
         * If set to 0, then node will be removed instead and never re-used. (Default: 0)
         */
        restoreNodeTimeout?: number;

        /**
         * The default selector. (Default: RR)
         * RR: Select one alternately. (Round-Robin)
         * RANDOM: Select the node by random function.
         * ORDER: Select the first node available unconditionally.
         */
        defaultSelector?: string;
    }
}

class PoolCluster extends EventEmitter {

    config: PoolCluster.PoolClusterOptions;

    add(config: PoolCluster.PoolClusterOptions): void;
    add(group: string, config: PoolCluster.PoolClusterOptions): void;

    end(): void;

    getConnection(callback: (err: NodeJS.ErrnoException | null, connection: PoolConnection) => void): void;
    getConnection(group: string, callback: (err: NodeJS.ErrnoException | null, connection: PoolConnection) => void): void;
    getConnection(group: string, selector: string, callback: (err: NodeJS.ErrnoException | null, connection: PoolConnection) => void): void;

    of(pattern: string, selector?: string): PoolCluster;

    on(event: string, listener: Function): this;
    on(event: 'remove', listener: (nodeId: number) => void): this;
    on(event: 'connection', listener: (connection: PoolConnection) => void): this;
}

export = PoolCluster;
}
declare module 'mysql/lib/PoolCluster' {
import main = require('~mysql/lib/PoolCluster');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/protocol/sequences/Sequence.d.ts
declare module '~mysql/lib/protocol/sequences/Sequence' {

import {EventEmitter} from 'events';

class Sequence extends EventEmitter { }
export = Sequence;
}
declare module 'mysql/lib/protocol/sequences/Sequence' {
import main = require('~mysql/lib/protocol/sequences/Sequence');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/protocol/sequences/Query.d.ts
declare module '~mysql/lib/protocol/sequences/Query' {

import Sequence = require('~mysql/lib/protocol/sequences/Sequence');
import {OkPacket, RowDataPacket, FieldPacket} from '~mysql/lib/protocol/packets/index';
import {Readable} from 'stream';

namespace Query {

    export interface QueryOptions {
        /**
         * The SQL for the query
         */
        sql: string;

        /**
         * The values for the query
         */
        values?: any | any[] | { [param: string]: any };

        /**
         * Every operation takes an optional inactivity timeout option. This allows you to specify appropriate timeouts for
         * operations. It is important to note that these timeouts are not part of the MySQL protocol, and rather timeout
         * operations through the client. This means that when a timeout is reached, the connection it occurred on will be
         * destroyed and no further operations can be performed.
         */
        timeout?: number;

        /**
         * Either a boolean or string. If true, tables will be nested objects. If string (e.g. '_'), tables will be
         * nested as tableName_fieldName
         */
        nestTables?: any;

        /**
         * Determines if column values should be converted to native JavaScript types. It is not recommended (and may go away / change in the future)
         * to disable type casting, but you can currently do so on either the connection or query level. (Default: true)
         *
         * You can also specify a function (field: any, next: () => void) => {} to do the type casting yourself.
         *
         * WARNING: YOU MUST INVOKE the parser using one of these three field functions in your custom typeCast callback. They can only be called once.
         *
         * field.string()
         * field.buffer()
         * field.geometry()
         *
         * are aliases for
         *
         * parser.parseLengthCodedString()
         * parser.parseLengthCodedBuffer()
         * parser.parseGeometryValue()
         *
         * You can find which field function you need to use by looking at: RowDataPacket.prototype._typeCast
         */
        typeCast?: any;
    }

    export interface StreamOptions {
        /**
         * Sets the max buffer size in objects of a stream
         */
        highWaterMark?: number;

        /**
         * The object mode of the stream (Default: true)
         */
        objectMode?: any;
    }

    export interface QueryError extends NodeJS.ErrnoException {
        /**
         * Either a MySQL server error (e.g. 'ER_ACCESS_DENIED_ERROR'),
         * a node.js error (e.g. 'ECONNREFUSED') or an internal error
         * (e.g. 'PROTOCOL_CONNECTION_LOST').
         */
        code: string;

        /**
         * The sql state marker
         */
        sqlStateMarker?: string;

        /**
         * The sql state
         */
        sqlState?: string;

        /**
         * The field count
         */
        fieldCount?: number;

        /**
         * Boolean, indicating if this error is terminal to the connection object.
         */
        fatal: boolean;
    }
}

class Query extends Sequence {

    /**
     * The SQL for a constructed query
     */
    sql: string;

    /**
     * Emits a query packet to start the query
     */
    start(): void;

    /**
     * Determines the packet class to use given the first byte of the packet.
     *
     * @param firstByte The first byte of the packet
     * @param parser The packet parser
     */
    determinePacket(firstByte: number, parser: any): any;

    /**
     * Creates a Readable stream with the given options
     *
     * @param options The options for the stream.
     */
    stream(options: Query.StreamOptions): Readable;

    on(event: string, listener: Function): this;
    on(event: 'error', listener: (err: Query.QueryError) => any): this;
    on(event: 'fields', listener: (fields: FieldPacket, index: number) => any): this;
    on(event: 'result', listener: (result: RowDataPacket | OkPacket, index: number) => any): this;
    on(event: 'end', listener: () => any): this;
}

export = Query;
}
declare module 'mysql/lib/protocol/sequences/Query' {
import main = require('~mysql/lib/protocol/sequences/Query');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/protocol/packets/OkPacket.d.ts
declare module '~mysql/lib/protocol/packets/OkPacket' {

interface OkPacket {
    constructor: {
        name: 'OkPacket'
    };
    fieldCount: number;
    affectedRows: number;
    changedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    procotol41: boolean;
}

export = OkPacket;
}
declare module 'mysql/lib/protocol/packets/OkPacket' {
import main = require('~mysql/lib/protocol/packets/OkPacket');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/protocol/packets/RowDataPacket.d.ts
declare module '~mysql/lib/protocol/packets/RowDataPacket' {

interface RowDataPacket {
    constructor: {
        name: 'RowDataPacket'
    };
    [column: string]: any;
    [column: number]: any;
}

export = RowDataPacket;
}
declare module 'mysql/lib/protocol/packets/RowDataPacket' {
import main = require('~mysql/lib/protocol/packets/RowDataPacket');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/protocol/packets/FieldPacket.d.ts
declare module '~mysql/lib/protocol/packets/FieldPacket' {

interface FieldPacket {
    constructor: {
        name: 'FieldPacket'
    };
    catalog: string;
    charsetNr: number;
    db: string;
    decimals: number;
    default: any;
    flags: number;
    length: number;
    name: string;
    orgName: string;
    orgTable: string;
    protocol41: boolean;
    table: string;
    type: number;
    zerofill: boolean;
}

export = FieldPacket;
}
declare module 'mysql/lib/protocol/packets/FieldPacket' {
import main = require('~mysql/lib/protocol/packets/FieldPacket');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/lib/protocol/packets/index.d.ts
declare module '~mysql/lib/protocol/packets/index' {

import OkPacket = require('~mysql/lib/protocol/packets/OkPacket');
import RowDataPacket = require('~mysql/lib/protocol/packets/RowDataPacket');
import FieldPacket = require('~mysql/lib/protocol/packets/FieldPacket');

export {
    OkPacket,
    RowDataPacket,
    FieldPacket
}
}
declare module 'mysql/lib/protocol/packets/index' {
export * from '~mysql/lib/protocol/packets/index';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-mysql/c3a7c0bf94ecf886d5ce7b5e4e5e7d17cf5b9668/index.d.ts
declare module '~mysql/index' {

import Connection = require('~mysql/lib/Connection');
import {ConnectionOptions, SslOptions} from '~mysql/lib/Connection';
import PoolConnection = require('~mysql/lib/PoolConnection');
import Pool = require('~mysql/lib/Pool');
import {PoolOptions} from '~mysql/lib/Pool';
import PoolCluster = require('~mysql/lib/PoolCluster');
import {PoolClusterOptions} from '~mysql/lib/PoolCluster';
import Query = require('~mysql/lib/protocol/sequences/Query');
import {QueryOptions, StreamOptions, QueryError} from '~mysql/lib/protocol/sequences/Query';

export function createConnection(connectionUri: string): Connection;
export function createConnection(config: Connection.ConnectionOptions): Connection;
export function createPool(config: Pool.PoolOptions): Pool;
export function createPoolCluster(config?: PoolCluster.PoolClusterOptions): PoolCluster;
export function escape(value: any): string;
export function format(sql: string): string;
export function format(sql: string, values: any[]): string;
export function format(sql: string, values: any): string;

export {
    ConnectionOptions,
    SslOptions,
    PoolOptions,
    PoolClusterOptions,
    QueryOptions,
    QueryError
}
export * from '~mysql/lib/protocol/packets/index'

// Expose class interfaces
export interface Connection extends Connection {}
export interface PoolConnection extends PoolConnection {}
export interface Pool extends Pool {}
export interface PoolCluster extends PoolCluster {}
export interface Query extends Query {}
}
declare module 'mysql/index' {
export * from '~mysql/index';
}
declare module 'mysql' {
export * from '~mysql/index';
}
