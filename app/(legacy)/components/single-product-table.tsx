import { Table, TableBody, TableCell, TableRow } from '../../../components/ui/table';
import { Specifications } from '../types';

function createData(
  specs: string,
  value: string,
  unit: string
) {
  return { specs, value, unit };
}

export default function SingleProductTable(spec: Specifications, styling: string) {
  const rows = [
    createData('Diameter Speaker', spec.diameter_speaker, 'inch'),
    createData('Daya maksimum*', spec.daya_maksimum, 'Watt'),
    createData('Lebar Daerah Frekuensi', spec.lebar_daerah_frekuensi, 'Hz'),
    createData('Sensitivity', spec.spl, 'dB'),
    createData('Medan Magnet', spec.medan_magnet, 'T'),
    createData('Berat Magnet', spec.berat_magnet, 'Kg'),
    createData('Diameter Voice Coil', spec.voice_coil_diameter, 'mm'),
    createData('Impedansi', spec.impedansi, 'Ω'),
    createData('Nominal Power Handling¹', spec.nominal_power_handling, 'Watt'),
    createData('Program Power²', spec.program_power, 'Watt'),
    createData('Material Voice Coil', spec.voice_coil_material, ''),
    createData('Berat Speaker', spec.berat_speaker, 'Kg'),
  ];
  let customNote = spec.custom_note
  const notesArray = customNote.split(/(?=- \([\d¹²³⁴⁵⁶⁷⁸⁹]\))/g).map(note => note.trim());
  return (
    <>
      <Table>
        <TableBody className='border'>
          {rows.map((row, index) => ( 
            row.value? 
              <TableRow key={index}>
                <TableCell className={`${styling} border p-2`}>
                  <h3>{row.specs}</h3>
                </TableCell>
                <TableCell className={`${styling} border p-2`}>
                  {row.value ? 
                    <h4>
                      {row.value} {row.unit}
                    </h4>
                  : 
                    '-'
                  }
                </TableCell>
              </TableRow>
            :
              null
          ))}
        </TableBody>
      </Table>  
      <div className='pt-4 text-xs text-black'>
        {notesArray.map((note, index) => 
          <h3 key={index} className='pb-2'>
            {note}
          </h3>
        )}
      </div>
    </>
  );
}