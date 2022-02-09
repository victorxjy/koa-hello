class SnowflakeId {
    #measure;
    #lastEpoch;
    #increment;
    /**
     * SnowfalkeId constructor
     * @date 2022-01-11
     * @constructs SnowfalkeId
     * @param {number} [machineId=0] - ID of the host.
     * @param {(string|number)} [begin='2022-01-01T00:00:00.000+0800'] - The begin of timestamps
     * @param {string} [TIMESTAMPS_UNIT='s'] - The dimension of timestamps
     * @param {number} [INCREMENT_BIT=16] - The max number of digits that the increment has
     * @param {number} [MACHINEID_BIT=5] - The max number of digits that the machine-ID has
     * @returns {Object} 
     */
    constructor(
        machineId = 1,
        begin = '2001-01-01T00:00:01.001+0800',
        TIMESTAMPS_UNIT = 's',
        INCREMENT_BIT = 16,
        MACHINEID_BIT = 5) {
        this.machineId = machineId;
        this.#measure = TIMESTAMPS_UNIT.toLowerCase() === 's' ? 1000 : 1;
        this.#lastEpoch = parseInt(Date.now() / this.#measure);
        this.begin = parseInt(new Date(begin).getTime() / this.#measure);
        this.TIMESTAMPS_UNIT = TIMESTAMPS_UNIT;
        this.TIMESTAMPS_BIT = TIMESTAMPS_UNIT.toLowerCase() === 's' ? 32 : 41;
        this.INCREMENT_BIT = INCREMENT_BIT;
        this.MACHINEID_BIT = MACHINEID_BIT;
        this.ID_BIT = this.TIMESTAMPS_BIT + INCREMENT_BIT + MACHINEID_BIT;
        if (this.ID_BIT > 53 && process.env.NODE_ENV !== 'test') {
            console.warn('The number of digits is more than 53, thus the type of id will be \'string\' to retain accuracy.')
        }
        this.#reset();
        Object.freeze(this);
    }
    /**
     * 描述
     * @date 2022-01-20
     * @returns {(number|string)} ID
     */
    generate() {
        return this.#nextId(parseInt(Date.now() / this.#measure));
    }
    #reset() {
        return this.#increment = 0;
    }
    #nextId(epoch) {
        if (epoch < this.#lastEpoch) {
            console.warn('clock is back:', epoch, 'from previous:', this.#lastEpoch);
            epoch = this.#lastEpoch;
        }
        if (this.#lastEpoch !== epoch) {
            this.#lastEpoch = epoch;
            this.#reset()
        }
        this.#increment++;
        if (this.#increment.toString(2).length > this.INCREMENT_BIT) {
            console.warn('Maximum id reached in 1', this.TIMESTAMPS_UNIT, 'in epoch:', epoch);
            return this.#nextId(epoch + 1);
        }
        return this.#generateId(epoch)
    }
    #hex2bin(num, bit) {
        let bin = num.toString(2);
        if (bin.length > bit) {
            throw new Error('Numeric overflow! The number of digits supposes to be', bit, 'but the function receives a parameter', num);
        }
        return bin.padStart(bit, '0');
    }
    #generateId(epoch) {
        const OFFSET = epoch - this.begin;
        if (OFFSET < 0) {
            throw new Error('clock is back:', epoch, 'from begin:', this.begin);
        }
        const ID = '0b' + this.#hex2bin(OFFSET, this.TIMESTAMPS_BIT) +
            this.#hex2bin(this.#increment, this.INCREMENT_BIT) +
            this.#hex2bin(this.machineId, this.MACHINEID_BIT);
        return this.ID_BIT <= 53 ? Number(ID) : BigInt(ID).toString();
    }

}
module.exports = SnowflakeId;
