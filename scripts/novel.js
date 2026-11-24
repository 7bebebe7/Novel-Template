//In brackets, indicate the name of the mod that is in "mod.json" / укажите имя мода которое находится в "mod.json"
const ModName = "novel-template"

const { scenes } = require("particles");


let d

Events.on(ClientLoadEvent, () => {d = new BaseDialog("", Styles.fullDialog)})
            
let currentFrame = 0
let currentScene = 0

function openNovel(scene) {
    if (scene < 0 || scene >= scenes.length) return
    
    currentFrame = 0
    currentScene = scene
        
    updateFrame()
    d.show()
}
        
function updateFrame() {
    const frame = scenes[currentScene].frames[currentFrame]
     
     d.buttons.clear()
                
    d.buttons.table(Styles.black3, t => {
            	
        t.table(Styles.none, t1 => {
            t1.add(frame.name)
        }).growX().colspan(3)
                	
        t.table(Styles.none, t2 => {
            t2.add(frame.text)
        }).growX().colspan(6)
                	
        t.table(Styles.none, t3 => {
            t3.button("Next", Styles.none, () => {
                if (currentFrame < scenes[currentScene].frames.length - 1) {
                    currentFrame++
                    updateFrame()
                } else {
                    d.hide()
                    currentFrame = 0
                }
            }).row()
                        
            t3.button("Back", Styles.none, () => {
                if (currentFrame > 0) {
                    currentFrame--
                    updateFrame()
                }
            }).row()
                        
        }).growX().colspan(1)
                	
    }).growX()
                
    d.setBackground(TextureRegionDrawable(Core.atlas.find(ModName + "-" + frame.bg)))
    d.titleTable.clear()
}

Events.on(ClientLoadEvent, () => {
    Vars.ui.menufrag.addButton("Novel 2.0", Icon.star, () => {openNovel(0)})
    
    Vars.ui.menufrag.addButton("Novel 2.0 (2)", Icon.star, () => {openNovel(1)})
})