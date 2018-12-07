import postDb from '../models/posts';

/**
 * @class PostController
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports PostController
 */

class PostController {
  /**
   * @method getRecords
   * @description Retrieves a list of records
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getRecords(req, res) {
    res.status(200).json({ status: 200, data: [...postDb] });
  }

  /**
   * @method getARecord
   * @description Retrieves a specific record with a given iID
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getARecord(req, res) {
    const data = postDb.filter(recordObj => Number(req.params.id) === recordObj.id);
    res.status(200).json({ status: 200, data });
  }

  /**
   * @method postRecord
   * @description Posts the given record to the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static postRecord(req, res) {
    const {
      type, comment, latitude, longitude,
    } = req.body;

    const id = postDb.length + 1;
    const recordData = {
      id,
      comment,
      type,
      location: `${latitude}, ${longitude}`,
      createdOn: new Date(),
      createdBy: 8,
      status: 'drafted',
      images: [],
      videos: [],
    };

    postDb.concat(recordData);

    res.status(201).json({
      status: 201,
      data: [{ id, message: `Created ${type} record` }],
    });
  }

  /**
   * @method updateReport
   * @description Updates a specific report based on the given parameters
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static updateReport(req, res) {
    const { latitude, longitude, comment } = req.body;
    const recordID = Number(req.params.id);
    let message = '';

    postDb.forEach((record, recordIndex) => {
      if (recordID === record.id) {
        if (comment) {
          postDb[recordIndex].comment = `${comment}`;
          message = 'Red-flag record comment has been updated succesfully';
        } else {
          postDb[recordIndex].location = `${latitude}, ${longitude}`;
          message = 'Updated red-flag record\'s location';
        }
      }
    });

    res.status(200).json({
      status: 200, data: [{ id: recordID, message }],
    });
  }

  /**
   * @method deleteRecord
   * @description Deletes a specific record
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static deleteRecord(req, res) {
    const recordID = Number(req.params.id);

    postDb.forEach((record, recordIndex) => {
      if (recordID === record.id) {
        postDb.splice(recordIndex, 1);
      }
    });

    res.status(200).json({
      status: 200, data: [{ id: recordID, message: 'red-flag record has been deleted' }],
    });
  }
}

export default PostController;
