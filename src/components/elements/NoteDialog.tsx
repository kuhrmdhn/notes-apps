import { dialogStore } from "@/store/dialogStore"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useShallow } from "zustand/shallow"


export default function NoteDialog() {
    const dialogRef = useRef(null)
    const { dialogNote, dialogOpen } = dialogStore(useShallow((state) => ({
        dialogNote: state.dialogNote,
        dialogOpen: state.dialogOpen,
    })))
    const dialog = {
        "open": { right: "0" },
        "close": { right: "-100%" },
    }

    const tableData = [
        {
            title: "Title",
            value: dialogNote?.title,
            optionalStyle: "font-bold"
        },
        {
            title: "Statue",
            value: dialogNote?.archived ? "Archived" : "Active",
        },
        {
            title: "Create on",
            value: dialogNote?.createdAt,
        }
    ]
    return (
        <motion.section ref={dialogRef} className='h-[100svh] w-[40svw] fixed top-0' variants={dialog} initial="close" animate={dialogOpen ? "open" : "close"}>
            <div className="h-full w-full pt-5 flex flex-col gap-5">
                <table className="w-full h-1/6">
                    <tbody className="w-full">
                        {
                            tableData.map((table, index) => (
                                <tr key={index} className="flex gap-3">
                                    <td className="w-1/6">{table.title}</td>
                                    <td className={`before:content-[':'] before:mr-2 before:font-normal ${table.optionalStyle}`}>
                                        {table.value}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <hr />
                <div className="overflow-auto h-3/5 w-full">
                    <p className="text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae omnis sint, autem, voluptatem ducimus ab architecto maxime velit cumque quis pariatur? Perferendis vitae, accusamus delectus dignissimos numquam, consequuntur impedit neque quis vel modi, laudantium in. Consequuntur provident tempore perferendis facilis earum nulla, unde totam iusto cupiditate culpa molestiae, dolores modi facere aliquam, voluptatum repellendus accusantium quidem quasi. Maiores voluptatem possimus pariatur natus sapiente obcaecati, amet libero, rem accusamus quia sint nostrum deserunt facilis ratione quo dolor accusantium aliquam repellendus corporis. Reiciendis, fugit impedit ad quam cupiditate fuga, eos modi consequuntur repudiandae quae, animi perspiciatis voluptatem esse et id iure officiis quidem omnis maiores. Corrupti fuga non amet sequi explicabo inventore mollitia deserunt adipisci modi, impedit accusamus, praesentium temporibus cupiditate? Corrupti illo doloremque odit iusto ad tempora quidem natus minus, cupiditate sapiente, at veniam perferendis corporis quia dicta eligendi repellendus dolorem odio! Et natus, minima reprehenderit, sapiente, explicabo voluptate eligendi alias consequatur animi eius ab dolores nemo velit quidem. Quibusdam voluptatem provident modi, expedita optio laudantium, reiciendis, quae facilis voluptas quidem harum? Sunt hic iusto cumque consequuntur, expedita nobis perferendis adipisci animi. Aliquid reprehenderit molestiae eaque in iure, explicabo, ullam fugiat reiciendis architecto tempore eligendi, libero eveniet sequi eos debitis voluptas dignissimos rerum. Ipsa illum saepe sit adipisci, quidem aspernatur totam repellat numquam sapiente aperiam dicta culpa sed reiciendis. Quis excepturi sint, aut dicta assumenda dolores ad minus quod ex laudantium vitae molestias reprehenderit alias beatae, aliquid quaerat asperiores qui! Dolorum illum laborum reprehenderit ipsa porro hic maxime fuga vero quae sapiente et consequatur molestiae accusamus rerum, architecto ipsum? Provident voluptas nulla sunt laudantium. Sapiente dolorum unde laudantium aspernatur ad corporis impedit assumenda tempora neque. Similique deserunt dolorum quam facere officiis ipsa id obcaecati corporis veniam aliquid sed optio molestiae, unde nobis magnam architecto maiores voluptatem aperiam soluta nesciunt laboriosam. Nisi dolor exercitationem corrupti quidem repellat reprehenderit obcaecati, explicabo temporibus suscipit doloremque harum voluptas velit excepturi esse. Hic illum quisquam ab nesciunt at laborum aliquam consectetur veniam repellendus voluptates ut rerum sunt id odit voluptatem provident enim optio earum odio facilis, sed quaerat sapiente. Sed dolores, placeat, officia debitis ullam ea voluptate aliquam iure beatae optio dolorum pariatur quia in voluptates error a? Enim, ipsa error minus dicta ab voluptatibus minima iste et explicabo hic eos nulla quas nisi! Ducimus quibusdam, dolorem quia nobis iusto reiciendis eum quos dignissimos praesentium voluptas, laboriosam vero impedit ipsam labore molestias expedita quam molestiae possimus sequi, tenetur nihil accusantium. Ratione esse optio at deserunt, quidem magni nam officia possimus ipsam rerum error sapiente placeat. Beatae officiis quidem commodi sit esse, exercitationem, natus distinctio explicabo possimus nam sed adipisci accusamus dignissimos, eum sint autem alias temporibus fugit aperiam culpa quae. Ipsa corporis ea doloribus vero quae cumque voluptate quaerat? Beatae voluptatem nobis molestias excepturi libero distinctio doloribus ea. Sint perspiciatis eveniet esse eaque dolore deserunt hic iusto, rem, dolores sunt quis cupiditate libero. Sint earum libero, rem nihil dolore officia quia omnis ipsam, obcaecati eaque laboriosam rerum corrupti saepe. Numquam autem, in, iusto maiores quasi, at debitis alias sunt ad quo nostrum hic. Magni placeat accusamus animi eius iste soluta temporibus tenetur, itaque aspernatur autem? Impedit distinctio itaque assumenda? Hic, voluptatibus? Debitis repellat sapiente placeat sint deserunt, dolorem, nam vitae quod sed unde amet dolore dicta sunt ad vel! Hic consequuntur corrupti temporibus itaque quod! Doloremque reprehenderit porro harum! Molestiae recusandae autem tenetur omnis itaque eius accusantium perspiciatis molestias numquam excepturi quia sequi voluptatibus exercitationem nesciunt quaerat obcaecati possimus expedita, consequatur alias quasi laudantium aliquam repellendus. Ducimus excepturi, illo sint optio voluptates saepe quae soluta dolorum sunt dolore quam harum ipsum nostrum ipsa provident quas exercitationem delectus! Modi distinctio fuga adipisci consequuntur nesciunt excepturi possimus tempora, voluptates quod fugit doloribus, sed expedita harum quam eaque temporibus officia? Veniam commodi deleniti quae maxime nostrum pariatur, quo inventore dolorem itaque repudiandae at mollitia eum perferendis cupiditate, illum nihil excepturi laboriosam alias veritatis facilis? Ullam voluptas ab, soluta cum impedit beatae minima voluptates fugiat amet eos ut sint unde culpa perferendis aut architecto nesciunt assumenda labore facere recusandae rerum blanditiis! Tenetur saepe fugit autem porro quaerat quas, sit minima nihil, fugiat a provident explicabo deserunt debitis repudiandae? Voluptas quidem veritatis voluptatum numquam blanditiis repellendus iure iste quia eos cumque, commodi, incidunt cum eaque architecto voluptates accusantium sapiente quod deserunt magni non distinctio doloremque fugiat dolorem. Magnam iure dolores dolor soluta delectus repudiandae corporis corrupti dignissimos, officia provident optio tempora! Sapiente, sunt esse? Aliquam fugit molestias, aperiam consectetur quia veniam atque est. Nulla assumenda nobis amet reiciendis ea dolor magni sunt, praesentium, enim explicabo alias doloribus iusto sequi molestias ad quae distinctio iure id odio. Obcaecati impedit eius optio dignissimos necessitatibus deleniti ut, quia maxime quidem repellat aliquid neque iusto id delectus, incidunt error cupiditate nam consequatur pariatur minus quaerat eos. Iste quo pariatur accusamus expedita, labore sit qui error voluptatem quisquam cum, iure veritatis magni id nam, quae fugiat molestias. Eveniet laudantium quasi provident perspiciatis neque fugiat, quis quisquam vitae explicabo doloremque omnis sit maxime tempore, quo mollitia et asperiores repudiandae odio assumenda perferendis minus praesentium nostrum! Asperiores veritatis adipisci architecto, temporibus deleniti vitae nostrum repellendus natus, excepturi ipsam voluptatibus aspernatur aliquid illum veniam, recusandae atque facilis praesentium amet perspiciatis distinctio! Odit maiores quidem nihil quibusdam fugit? Facere deleniti vel, tempora quae distinctio deserunt maxime id similique numquam tempore? Aliquam est placeat eius facere ducimus unde quisquam accusantium odit iure debitis aliquid tempora, totam quia sit numquam praesentium dolorem adipisci quis, aperiam eaque dolore vel ab molestiae laboriosam. Nemo tempora quis similique, saepe accusantium hic fugiat sapiente quos distinctio quas, ratione laborum eos vel provident ipsa eum maxime natus, vitae voluptatem quo cumque? Numquam modi nisi, expedita beatae veritatis quisquam assumenda est fugiat exercitationem non animi aliquam incidunt distinctio quas optio eaque similique aspernatur nobis et corporis! Doloremque illum, necessitatibus ut, vero culpa facilis quo dolores blanditiis iusto non deserunt asperiores cupiditate explicabo officia laborum? Dicta debitis doloremque commodi id? Quo obcaecati, deserunt numquam id odit sint! Autem nobis impedit officiis consequatur deleniti quo laborum ex sed facilis mollitia.</p>
                </div>
            </div>
        </motion.section>
    )
}
