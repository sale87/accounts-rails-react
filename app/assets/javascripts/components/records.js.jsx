var Records = React.createClass({
  getInitialState() {
    return {
      records: this.props.data,
    };
  },

  getDefaultProps() {
    return {
      records: [],
    };
  },

  addRecord(record) {
    records = this.state.records.slice();
    records.push(record);
    this.setState({records: records});
  },

  credits() {
    credits = this.state.records.filter(r => r.amount >= 0);
    return credits.reduce((prev, current) => prev + parseFloat(current.amount), 0);
  },

  debits() {
    debits = this.state.records.filter(r => r.amount < 0);
    return debits.reduce((prev, current) => prev + parseFloat(current.amount), 0);
  },

  balance() {
    return this.debits() + this.credits();
  },

  render() {
    var records = this.state.records.map((r) => {
      return React.createElement(Record, {key: r.id, record: r});
    });

    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          <AmountBox type="success" amount={this.credits()} text="Credit" />
          <AmountBox type="danger" amount={this.debits()} text="Debit" />
          <AmountBox type="info" amount={this.balance()} text="Balance" />
        </div>
        <RecordForm handleNewRecord={this.addRecord} />
        <hr></hr>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>Date</td>
              <td>Title</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            { records }
          </tbody>
        </table>
      </div>
    );
  }
});
