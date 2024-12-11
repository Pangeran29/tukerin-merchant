import Layout from '../components/layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const contentItems = [
  { id: 1, title: 'Getting Started with Next.js', author: 'John Doe', status: 'Published', date: '2023-05-15' },
  { id: 2, title: 'Advanced React Patterns', author: 'Jane Smith', status: 'Draft', date: '2023-05-20' },
  { id: 3, title: 'Mastering Tailwind CSS', author: 'Bob Johnson', status: 'Published', date: '2023-05-18' },
  { id: 4, title: 'Building Scalable APIs', author: 'Alice Brown', status: 'Review', date: '2023-05-22' },
]

export default function ContentPage() {
  return (
    <Layout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-[#FDDF23]">
        <Table>
          <TableHeader className="bg-[#FDDF23]">
            <TableRow>
              <TableHead className="text-black">Title</TableHead>
              <TableHead className="text-black">Author</TableHead>
              <TableHead className="text-black">Status</TableHead>
              <TableHead className="text-black">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-black">{item.title}</TableCell>
                <TableCell className="text-black">{item.author}</TableCell>
                <TableCell className="text-black">{item.status}</TableCell>
                <TableCell className="text-black">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

