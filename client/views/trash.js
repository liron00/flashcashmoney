view Trash {
  <trash>
    <quote>“</quote>
    {view.props.trash}
  </trash>
  
  $ = {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    fontSize: 36,
    fontFamily: 'Copperplate',
    color: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
  
  $quote = {
    fontSize: 100,
    fontFamily: 'Copperplate',
    position: 'relative',
    top: 8,
    left: -12
  }
}
